'use client'

import Link from "next/link"
import useCheckAuth from "@/customHooks/useCheckAuth"
import LoginForm from "./form/LoginForm"

const AuthorizationSection = () => {

    const isAuth = useCheckAuth()

    if(!isAuth){
        return(
            <section className="w-[90%]">
                <h1 className="pt-15 text-center text-[60px]">
                    Authorization
                </h1>
                <div className="pt-5 w-1/2 m-0 m-auto">
                    <LoginForm/>
                </div>
                <Link href={'/registration'}>
                <div className="mt-10 underline text-center cursor-pointer  hover:text-gray-500 transition-all duration-300">
                    {`Don't you have an account? Register!`}
                </div> 
                </Link>
            </section>
        )
    }
    return(
        <div className="text-center">
            <h1 className="mt-15 text-[60px]">You have entered into your acc!</h1>
            <Link href={'/desks'}><h2 className="mt-5 text-[40px] underline hover:text-gray-500 transition-all duration-300 cursor-pointer">Go to TODOlists</h2></Link>
        </div>
    )
}

export default AuthorizationSection