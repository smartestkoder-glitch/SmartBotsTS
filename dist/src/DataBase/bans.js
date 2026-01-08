import { prisma } from "../../lib/prisma.js";
const dbBans = {
    create: async (botId, json, text) => {
        await prisma.bans.create({
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
export default dbBans;
