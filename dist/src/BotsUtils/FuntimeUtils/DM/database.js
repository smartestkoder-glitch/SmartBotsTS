import { prisma } from "../../../../lib/prisma.js";
const autoDMDatabaseFunc = {
    addPage: async (data, marketMy) => {
        const r = await prisma.autoDMPages.create({
            data: {
                marketMy,
                Slots: {
                    create: data
                }
            }
        });
        return r;
    }
};
export default autoDMDatabaseFunc;
