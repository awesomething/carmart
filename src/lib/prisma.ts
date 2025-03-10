import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as {prisma: PrismaClient}

function makeClient(){
    return new PrismaClient({log: ["error", "warn", "info"]})
}

export const prisma = globalForPrisma.prisma || makeClient();

if(process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma