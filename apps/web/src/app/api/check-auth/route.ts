import { auth } from "@/lib/auth/auth";
import { getProfile } from "@repo/database/profile";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    const pathname = request.nextUrl.searchParams.get("pathname");

    if (!session) {
        if (
            pathname?.startsWith("/app") ||
            pathname === "/auth/create-profile"
        ) {
            return NextResponse.json({ path: "/" });
        }
        return NextResponse.json({ path: "next" });
    }

    const profile = await getProfile((session.user.id)).catch(() => null);
    if (!profile) {
        if (pathname === "/auth/create-profile"){
            return NextResponse.json({ path: "next" });
        }
        return NextResponse.json({ path: "/auth/create-profile" });
    } else if (profile && (pathname === "/" || pathname?.startsWith("/auth"))) {
        return NextResponse.json({ path: "/app" });
    }

    return NextResponse.json({ path: "next" });
}
