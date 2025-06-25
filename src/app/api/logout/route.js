import { NextResponse } from "next/server";

export async function POST() {
  try {
    const response = NextResponse.json(
      { message: "Logout successful", success: true },
      { status: 200 }
    );
    
    // Clear the cookie
    response.cookies.set("logintoken", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      expires: new Date(0),
      path: "/",
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { error: error.message, success: false },
      { status: 500 }
    );
  }
}