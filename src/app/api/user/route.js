import { ConnectionDB } from "@/app/helpers/bd";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { UserDatas } from "@/app/model/UserData";

export const GET = async () => {
  try {
    await ConnectionDB();

    return NextResponse.json({
      message: "ok",
    });
  } catch (error) {
    return NextResponse.json(error);
  }
};

export const POST = async (request) => {
  try {
    await ConnectionDB();

    const { name, email, password, about, Profileurl } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "Name, email, and password are required." },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(
      password,
      parseInt(process.env.bcrypt_js)
    );

    const newUser = new UserDatas({
      name,
      email,
      password: hashedPassword,
      about,
      Profileurl,
    });

    const savedUser = await newUser.save();

    return NextResponse.json(savedUser, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: error.message || "Server error" },
      { status: 501 }
    );
  }
};
