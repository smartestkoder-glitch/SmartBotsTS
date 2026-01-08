import { prisma } from "../../lib/prisma.js";
const dbPriceConfig = {
    create: async (itemName, priceSell, priceBuy, potion) => {
        await prisma.priceConfig.create({
            data: {
                itemName,
                priceBuy,
                priceSell,
                potion
            }
        });
    }
};
export default dbPriceConfig;
