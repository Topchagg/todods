import { FC } from "react"

import { deskProps } from "./interface"

const Desk:FC<deskProps> = ({name}) => {
    return (
        <div className="w-[350px] h-[350px] border rounded-4xl border-white text-[50px] flex justify-center items-center cursor-pointer hover:bg-gray-600 transition-all duration-300">
            {name}
        </div>
    )
}

export default Desk