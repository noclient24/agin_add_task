import { NextResponse } from "next/server";

export function middleware(request) {
  const jwt = request.cookies.get("logintoken")?.value;
 const { pathname } = request.nextUrl;
  if (request.nextUrl.pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  const Auth =
     pathname === "/pages/SignUp" ||
    pathname === "/pages/Login"; 
  if (jwt && Auth) {
    return NextResponse.redirect(new URL("/pages/add_Task", request.url));
  }

  if (!jwt && !Auth) {
    return NextResponse.redirect(new URL("/pages/Login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/pages/SignUp", "/pages/Login","/pages/add_Task"],
};
