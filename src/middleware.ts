import { NextResponse } from "next/server"; // Import NextResponse for handling responses
import NextAuth from "next-auth";
import authConfig from "../auth.config";
import {
    DEFAULT_SIGNIN_REDIRECT,
    apiAuthPrefix,
    authRoutes,
    publicRoutes,
} from "../route";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
    const { nextUrl } = req;
    const isLoggedIn = !!req.auth;

    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
    const isAuthRoute = authRoutes.includes(nextUrl.pathname);

    if (isApiAuthRoute) return NextResponse.next(); // Use NextResponse.next() instead of null

    if (isAuthRoute) {
        if (isLoggedIn)
            // return NextResponse.redirect(new URL(DEFAULT_SIGNIN_REDIRECT, nextUrl));
            return NextResponse.next();
    }

    if (!isLoggedIn && !isPublicRoute)
        //  return NextResponse.redirect(new URL("/signin", nextUrl));

        console.log("route", req.nextUrl.pathname, "isLoggedIn", isLoggedIn);
    return NextResponse.next();
});

export const config = {
    matcher: [
        // Skip Next.js internals and all static files, unless found in search params
        "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
        // Always run for API routes
        "/(api|trpc)(.*)",
    ],
};
