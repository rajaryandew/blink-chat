import { NewProfile } from "@/lib/types";
import prisma from "./prisma";

export default async function createProfileRecord(profile: NewProfile) {
    try {
        await prisma.profile.create({
            data: profile,
        });
    } catch {
        throw new Error("error while creating profile");
    }
}

export async function getProfileRecord(userId: string) {
    const profile = await prisma.profile.findUnique({
        where: {
            userId,
        },
    });

    return profile || null;
}