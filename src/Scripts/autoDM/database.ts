
import {prisma} from "../../lib/prisma.js";

const autoDMDatabaseFunc = {

    addPage: async(data, marketMy) => {

        const r = await prisma.pages.create({
            data: {
                marketMy,
                slots: {
                    create: data
                }
            }
        })
        return r

    }

}

export default autoDMDatabaseFunc