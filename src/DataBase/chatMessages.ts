import {prisma} from "../../lib/prisma.js";


const dbChatMessages = {

    create: async (botId :number, json :string, text :string | undefined) => {
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
        })
    }
}

export default dbChatMessages