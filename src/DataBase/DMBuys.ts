import {prisma} from "../../lib/prisma.js";

const dbDMBuys = {
    create: async (botId :number | undefined, dealer :string | undefined, price :number | undefined, course :number | undefined, name :string | undefined, success: boolean | undefined) => {
        await prisma.dMBuys.create({
            data: {
                Bot: {
                    connect: {
                        id: botId
                    }
                },

                dealer,
                price,
                course,
                name,
                success
            }
        })
    }
}

export default dbDMBuys