"use server"
import { CreateProfileInput, createProfileSchema, Profile } from "@repo/schema/profile";
import { auth } from "../auth/auth";
import { headers } from "next/headers";
import {createProfile} from "@repo/database/profile"
import { redirect } from "next/navigation";

import {AppError} from "@repo/error"


export async function createProfileAction(data: CreateProfileInput) {

    const session = await auth.api.getSession({
        headers: await headers(),
    });

    let profile:Profile | undefined;

    try {
        const result = createProfileSchema.safeParse(data)
    
        if(result.success && session){
            profile = await createProfile(result.data,session?.session.userId)
        } else{
            console.log(result.error)
        }
        
    } catch (err) {
        throw err
    }
    if(profile){
        redirect("/app")
    }
}
