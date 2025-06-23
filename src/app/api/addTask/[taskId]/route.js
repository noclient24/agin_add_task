import { ConnectionDB } from "@/app/helpers/bd"
import { Task } from "@/app/model/add_Task";
import { NextResponse } from "next/server"

export const GET = async (request, { params }) => {
    try {
        const { taskId } = params;
        const tasks = await Task.find({ userId: taskId });
        return NextResponse.json(tasks);


    } catch (error) {
        console.error("Error retrieving tasks:", error);
        return NextResponse.json(
            { message: "Failed to retrieve tasks", status: false, error: error.message },
            { status: 500 }
        );
    }
};


export const DELETE = async (request, { params }) => {
    try {
        await ConnectionDB();
        const { taskId } = await params; // Add await here

        const taskData = await Task.findByIdAndDelete(taskId);

        if (!taskData) {
            return NextResponse.json(
                { message: "Task not found", status: false },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { message: "Task deleted successfully", status: true },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error deleting task:", error);
        return NextResponse.json(
            { message: "Internal server error", status: false },
            { status: 500 }
        );
    }
}