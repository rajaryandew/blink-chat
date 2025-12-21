import { CreateProfileInput, Profile } from "@repo/schema/profile";
import { prisma } from "../prisma";
import { mapDatabaseError } from "../db-errors.conditionals";

export async function createProfile(profileInput:CreateProfileInput,userId:string){
    try {
        const profile:Profile = await prisma.profile.create({
            data:{
                userId,
                ...profileInput
            }
        })
        return profile
    } catch (err) {
        const mappedError = mapDatabaseError(err)
        throw mappedError
    }
}