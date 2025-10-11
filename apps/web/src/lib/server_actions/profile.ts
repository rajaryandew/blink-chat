"use server"
import { headers } from "next/headers";
import { auth } from "../auth/auth";
import createProfileRecord from "../db/profile";
import { NewProfile } from "../types";

export async function createProfile(formData: FormData){

    const session = await auth.api.getSession({
        headers: await headers()
    })

    const data = Object.fromEntries(formData.entries())

    const profile:NewProfile = {
        username:data.username as string,
        displayName: data.name as string,
        userId: session!.user.id 
    }

    try{
        await createProfileRecord(profile)
        console.log("account created")
    }catch(err){
        throw err
    }
}