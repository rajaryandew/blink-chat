import { PrismaClient } from "@/generated/prisma";
import { ENVIRONMENT } from "../config";

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined;
};

const prisma =
    globalForPrisma.prisma ||
    new PrismaClient({
        transactionOptions: {
            maxWait: 2000,
            timeout: 2000,
        },
    });

if (ENVIRONMENT !== "prod" && ENVIRONMENT !== "production")
    globalForPrisma.prisma = prisma;

export default prisma;
