import prisma from "../prisma";

export async function getProfileRecord(userId:string){
    const profile = await prisma.profile.findUnique({
        where:{
            userId
        }
    })

    return profile || null
}