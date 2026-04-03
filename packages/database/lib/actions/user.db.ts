import { mapDatabaseError } from "../db-errors.conditionals";
import { prisma } from "../prisma";

export async function getUserAvatarRecord(userId: string) {
    try {
        const avatar = await prisma.user.findUnique({
            where: {
                id: userId,
            },
            select:{
                image:true
            }
        });
        return avatar
    } catch (error) {
        mapDatabaseError(error);
    }
}
