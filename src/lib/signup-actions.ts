import { authClient } from "./auth/auth-client";

export async function signupWithGoogle(){
    await authClient.signIn.social({
        provider:"google",
        callbackURL: "/app",
        errorCallbackURL:"/auth-error",
        newUserCallbackURL:"/create-profile"
    })
}