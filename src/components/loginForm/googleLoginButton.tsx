"use client";
import { signup } from "@/lib/signup-action";
import { Button } from "../ui/button";

export default function SignupButton({
    provider,
    logo,
    text
}: {
    provider: string,
    text:string,
    logo: React.ReactNode
}) {
    return (
        <Button
            variant="secondary"
            type="button"
            onClick={() => signup(provider)}
        >
            {logo}
            {text}
        </Button>
    );
}
