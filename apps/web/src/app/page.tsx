"use client";
import { Button } from "@/components/ui/button";
import { socialSignIn } from "@/lib/auth/sign-in";
import Link from "next/link";

export default function Home() {
    return (
        <div>
            <h1>hello</h1>
            <Link href="/auth/login">Signup</Link>
        </div>
    );
}
