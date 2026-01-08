import {prisma} from "../../lib/prisma.js";


const dbDeaths = {

    create: async (botId :number) => {
        await prisma.deaths.create({
            data: {
                Bot: {
                    connect: {
                        id: botId
                    }
                }
            }
        })
    }
}

export default dbDeaths