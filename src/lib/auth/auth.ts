import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
// If your Prisma file is located elsewhere, you can change the path
import { PrismaClient } from "../../generated/prisma";
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from "../config";

const prisma = new PrismaClient();
export const auth = betterAuth({
    socialProviders:{
        google:{
            clientId: GOOGLE_CLIENT_ID,
            clientSecret: GOOGLE_CLIENT_SECRET
        }
    },
    database: prismaAdapter(prisma, {
        provider: "postgresql", // or "mysql", "postgresql", ...etc
    }),
});
