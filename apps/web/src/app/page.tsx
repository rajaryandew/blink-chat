"use client";
import { Button } from "@/components/ui/button";
import { socialSignIn } from "@/lib/auth/sign-in";

export default function Home() {
    return (
        <div>
            <h1>hello</h1>
            <Button onClick={async () => await socialSignIn("google")}>
                google login
            </Button>
        </div>
    );
}
