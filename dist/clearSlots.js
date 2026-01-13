import { prisma } from "./lib/prisma";
await prisma.autoDMSlots.deleteMany();
await prisma.autoDMPages.deleteMany();
console.log(await prisma.autoDMPages.findMany());
console.log(await prisma.autoDMSlots.findMany());
