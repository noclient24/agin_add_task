import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { ConnectionDB } from "@/app/helpers/bd";
import {UserDatas} from "@/app/model/UserData";
export const POST = async (request) => {
  try {
    await ConnectionDB()
    const { email, password } = await request.json();

    const userFind = await UserDatas.findOne({ email });

    if (!userFind) {
      return NextResponse.json("Email is not Exist");
    }

    const comparepassword = await bcrypt.compare(password, userFind.password);

    if (!comparepassword) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    const Token = jwt.sign(
      { _id: userFind._id, name: userFind.name },
      process.env.JWT_KEY,
      { expiresIn: "1d" }
    );

    const resposne = NextResponse.json({
      message: "Login successful",
      user: userFind,
      status: 201,
    });

    resposne.cookies.set("logintoken", Token, {
      httpOnly: true,
    });

    return resposne
  } catch (error) {
    console.log(error)
    return NextResponse.json({
      message: "Fail to login",
      status: 500,
      error:error
    });
  }
};
