import { ConnectionDB } from "@/app/helpers/bd"
import { UserDatas } from "@/app/model/UserData";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server"

export const GET = async (request) => {
    try {
        await ConnectionDB()
        const authToken = request.cookies.get("logintoken")?.value;
        const data = jwt.verify(authToken, process.env.JWT_KEY);
        const user = await UserDatas.findOne({ _id: data._id }).select("-password");
        return NextResponse.json(user)
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            message: "current user not Found",
            status: 5010
        })
    }
}