

import {prisma} from "../../lib/prisma.js";


const dbAutoDMParser = {

    createPage: async (marketMy :number, data :any) => {
        await prisma.autoDMPages.create({
            data: {
                marketMy,
                Slots: {
                    create: data
                }

            }
        })
    }
}

export default dbAutoDMParser