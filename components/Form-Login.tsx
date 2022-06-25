import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import useAuth from "../hooks/useAuth";

interface Inputs {
    email: string,
    password: string
}

function FormLogin() {

    const [login, setLogin] = useState(false);
    const {signIn, signUp} = useAuth();

    const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = async({ email, password }) => {
        if(login) {
            await signIn(email, password)
        }
        else {
            await signUp(email, password)
        }
    };


    return (
        <form onSubmit={handleSubmit(onSubmit)} className="relative mt-24 space-y-8 rounded-lg bg-black/70 py-10 px-8 md:mt-0 md:max-w-md md:px-14">
            <h3 className="text-3xl font-semibold md:text-4xl">Sign In</h3>
            <div className="space-y-5">
                <label htmlFor="" className="inline-block w-full">
                    <input  type="email" id="" 
                            className="form-input" 
                            placeholder="your email"
                            {...register("email", { required: true })}/>
                        {
                            errors.email && 
                                <p className="p-1 mt-1.5 text-[14px] font-light text-orange-600">Vui lòng nhập email của bạn</p>
                        }
                </label>
                <label htmlFor="" className="inline-block w-full">
                    <input  type="password" id="" 
                            className="form-input" 
                            placeholder="your password"
                            {...register("password", { required: true })}/>
                        {
                            errors.password &&
                            <p className="p-1 mt-1.5 text-[14px] font-light text-orange-600">Vui lòng nhập mật khẩu của bạn</p>
                        }
                </label>
            </div>
            <input  type="submit" value="Sign In" 
                    className="w-full bg-[#e50914] cursor-pointer rounded-md py-3 font-semibold inline-block mt-10" 
                    onClick={() => setLogin(true)}/>

            <p> Don't have an account yet ?
                <button className="ml-2 text-[#e50914] hover:underline hover:underline-offset-4"
                        onClick={() => setLogin(false)}>Sign up now
                </button>
            </p>
        </form>
    )
}

export default FormLogin