import { MiddlewareConfig, NextRequest, NextResponse } from "next/server";
import { AuthStatus } from "./lib/types";

export default async function middleware(request: NextRequest) {
    const baseURL = request.nextUrl.origin;
    const response = await fetch(`${baseURL}/api/auth-verify`, {
        headers: request.headers,
    });
    const { authStatus }: { authStatus: AuthStatus } = await response.json();

    if (request.nextUrl.pathname === "/") {
        switch (authStatus) {
            case AuthStatus.authenticated:
                NextResponse.redirect(`${baseURL}/app`);
            case AuthStatus.incompleteProfile:
                NextResponse.redirect(`${baseURL}/create-profile`);
            default:
                break;
        }
    } else {
        if (authStatus === AuthStatus.authenticated) {
            const redirectResponse = NextResponse.redirect(`${baseURL}/app`);
            return redirectResponse;
        } else if (authStatus === AuthStatus.notAuthenticated) {
            const redirectResponse = NextResponse.redirect(`${baseURL}`);
            return redirectResponse;
        } else if (authStatus === AuthStatus.incompleteProfile) {
            const redirectResponse = NextResponse.redirect(
                `${baseURL}/create-profile`
            );
            return redirectResponse;
        } else if (authStatus === AuthStatus.errorFindingStatus) {
            const redirectResponse = NextResponse.redirect(
                `${baseURL}/auth-error`
            );
            return redirectResponse;
        }
    }
    return NextResponse.next();
}

export const config: MiddlewareConfig = {
    matcher: ["/", "/create-profile/", "/app", "/app/:path*"],
};
