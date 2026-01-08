import {prisma} from "../../lib/prisma.js";


const dbKicks = {

    create: async (botId: number, json: string, text: string | undefined) => {
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
        })
    }
}

export default dbKicks