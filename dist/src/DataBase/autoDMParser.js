import { prisma } from "../../lib/prisma.js";
const dbAutoDMParser = {
    createPage: async (marketMy, data) => {
        await prisma.autoDMPages.create({
            data: {
                marketMy,
                Slots: {
                    create: data
                }
            }
        });
    }
};
export default dbAutoDMParser;
