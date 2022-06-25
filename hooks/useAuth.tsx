import { useState, useContext, useEffect, createContext, useMemo } from "react";
import { auth } from '../firebase';
import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
    User
} from 'firebase/auth';
import { useRouter } from 'next/router';
import { async } from "@firebase/util";


interface AuthProviderProps {
    children: React.ReactNode
}

interface IAuth {
    user: User | null,
    signUp: (email: string, password: string) => Promise<void>,
    signIn: (email: string, password: string) => Promise<void>,
    logout: () => Promise<void>,
    error: string | null,
    loading: boolean
}

const AuthContext = createContext<IAuth>({
    user: null,
    signUp: async() => {},
    signIn: async() => {},
    logout: async() => {},
    error: null,
    loading: false
})

export const AuthProvider = ({ children } : AuthProviderProps ) => {

    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const router = useRouter();
    const [error, setError] = useState(null);
    const [initialLoading, setInitialLoading] = useState(true);

    // Persisting the user
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if(user) {
                // is logged in...
                setUser(user);
                setLoading(false);
            }
            else {
                // not logged in
                setUser(null);
                setLoading(true);
                router.push('/login')
            }
            setInitialLoading(false);
        })
    }, [auth])

    const signUp = async (email: string, password: string) => {
        setLoading(true);

        await createUserWithEmailAndPassword(auth, email, password)
        .then((userInformation) => {
            setUser(userInformation.user);
            router.push('/');
            setLoading(false);
        })
        .catch((error) => alert(error.message))
        .finally(() => setLoading(false));
    }

    const signIn = async (email: string, password: string) => {
        setLoading(true);

        await signInWithEmailAndPassword(auth, email, password)
        .then((userInformation) => {
            setUser(userInformation.user);
            router.push('/');
            setLoading(false);
        })
        .catch((error) => alert(error.message))
        .finally(() => setLoading(false));
    }

    const logout = async () => {
        setLoading(true);

        await signOut(auth).then(() => {
            setUser(null);
        })
        .catch((error) => alert(error.message))
        .finally(() => setLoading(false));
    }

    const memoValued = useMemo(() =>({
        user, loading, signUp, signIn, logout, error
    }), [user, loading])

    return  <AuthContext.Provider value={memoValued}>
                { !initialLoading && children}
            </AuthContext.Provider>
}

export default function useAuth() {
    return useContext(AuthContext)
}