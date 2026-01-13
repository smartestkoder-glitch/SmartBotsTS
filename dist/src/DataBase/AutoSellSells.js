import { prisma } from "../../lib/prisma";
const dbAutoSellSells = {
    create: async (botId, message, count = 0, item = "", price = 0) => {
        const r = await prisma.autoSellSells.create({
            data: {
                message: message,
                count: count,
                item: item,
                price: price,
                Bot: {
                    connect: {
                        id: botId
                    }
                }
            }
        });
        return r;
    }
};
export default dbAutoSellSells;
