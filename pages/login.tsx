import Head from "next/head"
import Image from "next/image"
import FormLogin from "../components/Form-Login";

function login() {

    return (
        <div className="relative w-screen h-screen flex flex-col bg-black md:items-center md:justify-center md:bg-transparent">
            <Head>
                <title>Neftlix Clone App</title>
                <link rel="icon" href="https://res.cloudinary.com/nam290596/image/upload/v1652358784/neftlix-clone-app/icon-for-netflix-24_hbnbpz.png" />
            </Head>
            
            <Image
                src="https://rb.gy/p2hphi"
                layout="fill"
                className="-z-10 opacity-60 !hidden sm:!inline"
                objectFit="cover"
            />

            <img 
                src="https://rb.gy/ulxxee" 
                alt="Logo Netflix" 
                className="absolute top-4 left-4 cursor-pointer object-contain md:left-10 md:top-6"
                width={120} height={120}/>

            {/* Form Login */}
            <FormLogin/>
        </div>
    )
}

export default login