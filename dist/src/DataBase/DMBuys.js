import { prisma } from "../../lib/prisma.js";
const dbDMBuys = {
    create: async (botId, dealer, price, course, name, success) => {
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
        });
    }
};
export default dbDMBuys;
