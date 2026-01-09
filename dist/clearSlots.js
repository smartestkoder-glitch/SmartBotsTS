import { prisma } from "./lib/prisma";
await prisma.autoDMPages.deleteMany();
await prisma.autoDMSlots.deleteMany();
