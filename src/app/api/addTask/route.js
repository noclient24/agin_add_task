import { ConnectionDB } from "@/app/helpers/bd";
import { NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import { Task } from "@/app/model/add_Task";


export const POST = async (request) => {
    try {
        await ConnectionDB()
        const { title, content, status } = await request.json();
        const token = request.cookies.get("logintoken")?.value;
        const tokenverify = jwt.verify(token, process.env.JWT_KEY);
        const addtask = new Task({
            title,
            content,
            status,
            userId: tokenverify._id
        })
        const createdTask = await addtask.save();
         return NextResponse.json(createdTask)

    } catch (error) {
        console.log(error)
        return NextResponse.json({
            message: "add task fail !",
            status: 501
        })
    }
}