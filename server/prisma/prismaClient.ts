import { PrismaClient } from "../src/generated/prisma";

declare global {
  var prisma: PrismaClient;
}

export const prismaDb = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  global.prisma = prismaDb;
}
