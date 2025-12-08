"use client"
import { socialSignIn } from "@/lib/auth/sign-in";
import { Button } from "../ui/button";

export default function LoginButton({provider, icon}: {provider:string, icon: React.ReactNode}) {
    
    async function onClick(){
        await socialSignIn(provider.toLowerCase())
    }

    return (
        <Button onClick={onClick} variant="default" type="button">
            {icon}
            Login with {provider}
        </Button>
    );
}