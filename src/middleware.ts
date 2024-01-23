import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
    function middleware(req){
        console.log("Pathname: ",req.nextUrl.pathname)
        console.log("Token: ",req.nextauth.token?.role)
        if (
            req.nextUrl.pathname.startsWith("/admin")
            && req.nextauth.token?.role !="Admin"
            ) {
                return NextResponse.redirect(new URL("/denied", req.url))
            }
    },
    {    
        callbacks: {
            authorized: ({ token }) => !!token && !!token.role
    }}
)

export const config = { matcher: ["/admin"]}