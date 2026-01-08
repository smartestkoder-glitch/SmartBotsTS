
import {prisma} from "../../lib/prisma.js";


const dbBans = {

    create: async (botId :number, json :string, text :string | undefined) => {
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
        })
    }
}

export default dbBans