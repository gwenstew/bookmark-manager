//resuable prisma client here
import { PrismaClient } from "@prisma/client";

//global prisma object to be reused between reloads
const globalPrisma = global as unknown as { prisma: PrismaClient }

//if prisma client exists--> use that, o/w create a new one
export const prisma =
    globalPrisma.prisma ||
    new PrismaClient({
        //logign queries (remove for prod)
        log:['query', 'error', 'warn', 'info']
    });

//if not in production we want save the client globally
if (process.env.NODE_ENV !== "production") globalPrisma.prisma = prisma;
