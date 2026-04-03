import { CreateProfileInput, Profile } from "@repo/schema/profile";
import { prisma } from "../prisma";
import { mapDatabaseError } from "../db-errors.conditionals";

export async function createProfile(
    profileInput: CreateProfileInput,
    userId: string,
) {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: userId,
            },
        });

        const profile: Profile = await prisma.profile.create({
            data: {
                userId,
                ...profileInput,
                profilePic: user?.image,
            },
        });
        return profile;
    } catch (err) {
        const mappedError = mapDatabaseError(err);
        throw mappedError;
    }
}

export async function getProfile(userId: string) {
    try {
        const profile: Profile | null = await prisma.profile.findUniqueOrThrow({
            where: {
                userId,
            },
        });
        return profile;
    } catch (err) {
        throw mapDatabaseError(err);
    }
}

export async function getProfileByUsername(username: string) {
    try {
        const profile: Profile | null = await prisma.profile.findUniqueOrThrow({
            where: {
                username,
            },
        });
        return profile;
    } catch (error) {
        throw mapDatabaseError(error);
    }
}