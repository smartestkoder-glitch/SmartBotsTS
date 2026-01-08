
import {prisma} from "../../../../lib/prisma.js";
import {DecodeDMDataSlot} from "../../../types/decodeDM.js";

const autoDMDatabaseFunc = {

    addPage: async(data :DecodeDMDataSlot[], marketMy :number) => {

        const r = await prisma.autoDMPages.create({
            data: {
                marketMy,
                Slots: {
                    create: data
                }
            }
        })
        return r

    }

}

export default autoDMDatabaseFunc