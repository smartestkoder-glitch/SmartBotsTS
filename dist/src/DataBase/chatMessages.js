import { prisma } from "../../lib/prisma.js";
const dbChatMessages = {
    create: async (botId, json, text) => {
        await prisma.chatMessages.create({
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
export default dbChatMessages;
