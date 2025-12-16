"use server"
import { CreateProfileInput, createProfileSchema } from "@repo/schema/profile";
import { auth } from "../auth/auth";
import { headers } from "next/headers";
import {createProfile} from "@repo/database/profile"



export async function createProfileAction(data: CreateProfileInput) {

    const session = await auth.api.getSession({
        headers: await headers(),
    });

    try {
        const result = createProfileSchema.safeParse(data)
    
        if(result.success && session){
            await createProfile(data,session?.session.userId)
        } else{
            console.log(result.error)
        }
        
    } catch (error) {
        console.log(error)
    }
}
