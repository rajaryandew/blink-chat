"use client"
import { signupWithGoogle } from "@/lib/signup-actions";
import GoogleLogo from "../svgs/google";
import { Button } from "../ui/button";

export default function GoogleLoginButton(){
    return (
        <Button variant="secondary" type="button" onClick={signupWithGoogle}>
            <GoogleLogo
             />
            Google
        </Button>
    );
}