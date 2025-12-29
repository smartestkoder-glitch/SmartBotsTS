import func from "../Bots utils/function.js"

const rubbish = {

    /**
     * Выкидывает все предметы кроме тех, которые в вайтлист
     * @param {import('mineflayer').Bot} bot
     * @param whiteList
     */
    all: async (bot, whiteList = []) => {
        if (!bot.smart.vars.work) return


        for (const slot of bot.inventory.slots) {
            if (!slot) continue

            await bot.tossStack(slot)
            await func.delay(100)
        }
    }

}

export default rubbish