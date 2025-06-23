import { ConnectionDB } from "@/app/helpers/bd"
import { NextResponse } from "next/server"

export  const GET=async()=>{
    try {
        await ConnectionDB()



    } catch (error) {
        console.log.log(error)
        return NextResponse.json({
            message:"current user not Found",
            status:5010
        })
    }
}