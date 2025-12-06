"use client"
import { authClient } from "./auth-client";

export async function socialSignIn(provider: string) {
    console.log("hello")
    await authClient.signIn.social({
        provider,
        callbackURL: "/app",
        errorCallbackURL: "/login-error",
        newUserCallbackURL: "/create-profile",
    });
}
