import func from '../function.js';
import window from '../window.js';

import autoBuySettings from "../../Bots settings/autoBuy settings.js";

const autoBuy = {
    /**
     * Функция для удобного представления предметов на аукционе
     * @param {import('mineflayer').Bot} bot
     * @returns {Promise<*>}
     */
    changeToSmartAh: async (bot) => {
        let ahOld = bot.currentWindow.slots.slice(0, 46)
        let ahNew = []

        for (const slot of ahOld) {
            ahNew.push({
                slot: slot.slot,
                item: slot.type,
                count: slot.count,
                price: Number(JSON.parse(bot.currentWindow.slots[0].nbt?.value?.display?.value?.Lore?.value?.value[3]).extra[2].text.replace(" ", "").replace("$", "").replace(",", ""))
            })
        }

        return ahNew
    },


    buySlot: async (bot, slot) => {

        window.click(bot, slot)
        if (!await window.waitToChangeCountSlot(bot, 5000)) return false
        else {
            window.click(bot, 2)
            await window.waitToChangeCountSlot(bot, 5000)
        }

    },

    //openAhExp: async (bot) => {
    //    bot.chat("/ah search опыт обычный")
    //    if (!await window.waitToChangeCountSlot(bot, 5000)) return autoBuy.openAhExp(bot)
    //},


    findNicePrice: (bot, itemSettigs) => {
        const ah = autoBuy.changeToSmartAh(bot)
        return ah.find(item => item.price >= itemSettigs.lowPrice && item.price <= itemSettigs.highPrice)
    },

    /**
     *
     * @param {import('mineflayer').Bot} bot
     * @returns {Promise<void>}
     */
    buyExp: async (bot) => {

        bot.chat("/ah search опыт обычный")
        await window.waitToChangeCountSlot(bot, 5000)

        const ah = await autoBuy.changeToSmartAh(bot)

        while (!autoBuy.findNicePrice(bot, autoBuySettings.exp))
        {
            await func.delay(2000)
            window.click(bot, 49)
        }
        await func.delay(500)

        await autoBuy.buySlot(bot, autoBuy.findNicePrice(bot, autoBuySettings.exp).slot)

        await func.delay(1500)

        bot.closeWindow(bot.currentWindow)

        await func.delay(1500)

    },

    /**
     *
     * @param {import('mineflayer').Bot} bot
     * @returns {Promise<void>}
     */
    buyAndCheckExp: async (bot) => {

        while (bot.inventory.slots.find(item => item.name === "experience_bottle")) await autoBuy.buyExp(bot)

    }
}