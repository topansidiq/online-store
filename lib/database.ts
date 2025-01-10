import {PrismaClient} from "@prisma/client"

declare global {
    var prisma: PrismaClient | undefined
}

const database = global.globalThis.prisma || new PrismaClient();
if (process.env.NODE_ENV !== 'production') globalThis.prisma = database;

export default database;