import { CreateProfileInput, Profile } from "@repo/schema/profile";
import { prisma } from "../prisma";

export async function CreateProfileRecord(profileInput:CreateProfileInput,userId:string){
    try {
        const profile:Profile = await prisma.profile.create({
            data:{
                userId,
                ...profileInput
            }
        })
        return profile
    } catch (error) {
        throw error
    }
}