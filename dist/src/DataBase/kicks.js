import { prisma } from "../../lib/prisma.js";
const dbKicks = {
    create: async (botId, json, text) => {
        await prisma.kicks.create({
            data: {
                text,
                json,
                Bot: {
                    connect: {
                        id: botId
                    }
                }
            }
        });
    }
};
export default dbKicks;
