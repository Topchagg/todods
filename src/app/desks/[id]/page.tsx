'use client'
import { useParams } from "next/navigation"


const DeskPage = () => {

    const {id} = useParams()

    return (
        <>
            <h1>{id}</h1>
        </>
    )
}

export default DeskPage