import { NextResponse } from "next/server"



export const POST = async = () => {
    try {

        const response = NextResponse.json({
            message: "logout successfully !"
        })

        response.cookies.set("logintoken", "", {
            httpOnly: true, // Ensure cookie is not accessible through JavaScript
            secure: process.env.NODE_ENV === 'production', // Only set secure cookies in production
            expires: new Date(0) // Expire immediately
        });

    } catch (error) {
        console.log(error)
        return NextResponse.json({
            message: "logout error"
        })
    }
}