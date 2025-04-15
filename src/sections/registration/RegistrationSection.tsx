import Link from "next/link";
import RegistrationForm from "./form/RegistrationForm";



const RegistrationSection = () => {
    return (
        <section className="w-[90%]">
            <div className="pt-15 text-center">
                <h1 className="text-[60px]">Registration</h1>
            </div>
            <div className="pt-5 w-1/2 m-0 m-auto">
                <RegistrationForm/>
            </div>
            <Link href={'/authorization'}>
            <div className="text-center underline cursor-pointer mt-5 hover:text-gray-500 transition-all duration-300">
                Already have an account? Sign in!
            </div>
            </Link>
        </section>
    )
}

export default RegistrationSection