import func from "../../../Bots utils/function.js"
import window from "../../../Bots utils/window.js"
import inventory from "../../../Bots utils/inventory.js"
import item from "../../../Bots utils/item.js";

const threeRubbish = {

    needItems: ["diamond_axe", "diamond_hoe", "stick", "emerald", "dark_oak_sapling", "bone", "bone_meal", "cooked_porkchop"],

    /**
     *
     * @param {import('mineflayer').Bot} bot
     * @returns {Promise<void>}
     */
    anotherRubbish: async (bot) => {
        for (let item of bot.inventory.slots) {
            if (!item || threeRubbish.needItems.includes(item.name)) continue
            else await bot.tossStack(item)
        }
    },

    /**
     *
     * @param {import('mineflayer').Bot} bot
     * @returns {Promise<void>}
     */
    rubbishStick: async (bot) => {
        while (inventory.getAllSlotsItem(bot.inventory.slots, "stick").length > 2) {
            await bot.tossStack(inventory.getSlotItem(bot.inventory.slots, "stick"))
            await func.delay(300)
        }
    },

    lookToRubbish: async (bot) => {
        await func.delay(500)
        await bot.look(3.145457432963716, 0.303684320422398)
        await func.delay(500)
    },

    allRubbish: async (bot) => {
        await threeRubbish.lookToRubbish(bot)
        await threeRubbish.anotherRubbish(bot)
        await threeRubbish.rubbishStick(bot)

    }

}

export default threeRubbish