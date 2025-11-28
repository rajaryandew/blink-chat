import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "@repo/database/prisma-client";
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from "./config";

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),
    emailAndPassword:{
        enabled:true
    },
    socialProviders:{
        google:{
            clientId: GOOGLE_CLIENT_ID,
            clientSecret:GOOGLE_CLIENT_SECRET
        }
    }
});
