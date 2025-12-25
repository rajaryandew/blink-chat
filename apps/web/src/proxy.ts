import { headers } from "next/headers";
import { NextRequest, NextResponse, ProxyConfig } from "next/server";

export async function proxy(request: NextRequest) {
    const pathname = request.nextUrl.pathname;
    const response = await fetch(
        new URL(`/api/check-auth?pathname=${pathname}`, request.url),
        {headers:request.headers}
    );
    const { path } = await response.json();
    if (path !== "next") {
        return NextResponse.redirect(new URL(path, request.url));
    }
    return NextResponse.next();
}

export const config: ProxyConfig = {
    matcher: ["/", "/app/:pathname*", "/auth/:pathname*"],
};
