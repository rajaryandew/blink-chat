import { NewProfile } from "@/lib/types";
import prisma from "../prisma";

export default async function createProfile(profile: NewProfile) {
    try {
        prisma.profile.create({
            data: profile,
        });
    } catch {
        throw new Error("error while creating profile");
    }
}
