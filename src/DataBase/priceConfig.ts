import {prisma} from "../../lib/prisma.js";

const dbPriceConfig = {
    create: async (itemName :string, priceSell: number, priceBuy :number, potion :string | undefined) => {
        await prisma.priceConfig.create({
            data: {
                itemName,
                priceBuy,
                priceSell,
                potion
            }
        })
    }
}

export default dbPriceConfig