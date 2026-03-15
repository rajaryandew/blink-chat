import { CreateProfileInput } from "@repo/schema/profile";
import { createProfileAction } from "../server-actions/profile.actions";
import { redirect, RedirectType } from "next/navigation";
import { CreateProfileResponse } from "../types/profile-actions.types";
import { UseFormSetError } from "react-hook-form";

export async function handleCreateProfile(
    data: CreateProfileInput,
    setError: UseFormSetError<CreateProfileInput>
) {
    const res: CreateProfileResponse = await createProfileAction(data);
    if (!res.ok) {
        switch (res.error?.message) {
            case "SESSION_INVALID":
                redirect("/auth/login");
            // fallthrough
            case "USER_NOT_AVAILABLE":
                redirect("/auth/login");
            // fallthrough
            case "VALIDATION FAILED":
                setError("root", {
                    message:
                        "It looks like something went wrong, try filling the detail again",
                });
                return;
            case "USERNAME_TAKEN":
                setError("username", { message: "Username already taken" });
                return;
            case "MISSING_FIELDS":
                setError("root", {
                    message: "It looks like you missed some fields.",
                });
                return;
            
            // server errors
            case "CONNECTION_FAILED":
                setError("root", {
                    message:
                        "We are having trouble while connecting to the server. Try again later!!",
                });
                return;
            case "UNKNOWN_ERROR":
                setError("root", {
                    message: "An unexpected error occurred. Try again!!",
                });
                return;
        }
    }
    redirect("/app", RedirectType.push);
}
