"use server"
import { CreateProfileInput, createProfileSchema, Profile } from "@repo/schema/profile";
import { auth } from "../auth/auth";
import { headers } from "next/headers";
import {createProfile} from "@repo/database/profile"
import { redirect } from "next/navigation";



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
        
    } catch (error) {
        console.log(error)
    }
    if(profile){
        redirect("/app")
    }
}
