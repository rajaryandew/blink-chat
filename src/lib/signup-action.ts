import { authClient } from "./auth/auth-client";

export async function signup(provider: string){
    await authClient.signIn.social({
        provider,
        callbackURL: "/app",
        errorCallbackURL:"/auth-error",
        newUserCallbackURL:"/create-profile"
    })
}