import func from "../../Bots utils/function.js"
import inventory from "../../Bots utils/inventory.js"
import window from "../../Bots utils/window.js"
import item from "../../Bots utils/item.js";
import attack from "../../Bots utils/attack.js";

import autoListva from "../AutoThree/OneThreeSmartBot/autoListva.js";
import threeDig from "../AutoThree/OneThreeSmartBot/threeDig.js";

const farmerExp = {

    checkRepairEnch: (item) => {
        if (!bot.smart.vars.work) return

    },


    /**
     * Берет сломанные предметы из клана и кладет починеные
     * @param {import('mineflayer').Bot} bot
     * @returns {Promise<>}
     */
    swapClanStorage: async (bot) => {
        if (!bot.smart.vars.work) return

        bot.chat("/clan storage")
        await window.waitToChangeCountSlot(bot, 10000)

        if (!bot.currentWindow) return

        const allHoe = inventory.getAllSlotsItem(bot.currentWindow.slots, "netherite_hoe", 0, 90)
        const allAxe = inventory.getAllSlotsItem(bot.currentWindow.slots, "netherite_axe", 0, 90)
        const allTools = allAxe.concat(allHoe)

        if (allTools.length === 0) return

        for (const tool of allTools) {
            const percentDurability = item.getDurability.percent(tool)

            if (!percentDurability) continue

            if (percentDurability > 90 && tool.slot > 53) {
                window.shiftClick(bot, tool.slot)
                await func.delay(200)
            }

            if (percentDurability <= 90 && tool.slot <= 53) {
                window.shiftClick(bot, tool.slot)
                await func.delay(200)
            }
        }

        bot.closeWindow(bot.currentWindow)
        await func.delay(200)

    },

    /**
     * Экипирует первый сломанный предмет в инвентаре в левую руку
     * @param {import('mineflayer').Bot} bot
     * @returns {Promise<>}
     */
    swapToolToOffHand: async (bot) => {
        if (!bot.smart.vars.work) return

        if (bot.currentWindow) return

        const offHandItem = bot.inventory.slots[45]

        if (item.getDurability.percent(offHandItem) < 95) return

        const allHoe = inventory.getAllSlotsItem(bot.inventory.slots, "netherite_hoe")
        const allAxe = inventory.getAllSlotsItem(bot.inventory.slots, "netherite_axe")
        const allTools = allAxe.concat(allHoe)

        if (allTools.length === 0) return

        for (const tool of allTools) {
            if (item.getDurability.percent(tool) < 90) {
                await bot.equip(tool, "off-hand")
                return
            }
        }
    },

    /**
     * Убирает инструмент из левой руки если он починен
     * @param {import('mineflayer').Bot} bot
     * @returns {Promise<>}
     */
    swapIfRepaired: async (bot) => {
        if (!bot.smart.vars.work) return

        if (bot.currentWindow) return

        const offHandItem = bot.inventory.slots[45]

        if (!offHandItem) return

        if (item.getDurability.percent(offHandItem) < 95) return

        await bot.unequip("off-hand")


    },

    /**
     * Ждет, пока починится предмет в левой руке
     * @param bot
     * @returns {Promise<void>}
     */
    waitToRepair: async (bot) => {
        if (!bot.smart.vars.work) return

        let offHandItem = bot.inventory.slots[45]
        while (item.getDurability.percent(offHandItem) < 95) await func.delay(500)
    },

    /**
     * Ищет сломанные предметы
     * @param bot
     * @returns
     */
    checkBrokenTools: (bot) => {
        if (!bot.smart.vars.work) return

        if (bot.currentWindow) return

        for (const tool of bot.inventory.slots) {
            if (item.getDurability.percent(tool) < 95) return true
        }
        return false
    },

    /**
     * Ищет починенные предметы
     * @param bot
     * @returns
     */
    checkNormalTools: (bot) => {
        if (!bot.smart.vars.work) return

        if (bot.currentWindow) return

        for (const tool of bot.inventory.slots) {
            if (item.getDurability.percent(tool) >= 95) return true
        }
        return false
    },

    /**
     * Чинит все сломанные предметы в инвентаре
     * @param {import('mineflayer').Bot} bot
     * @returns {Promise<void>}
     */
    repairAll: async (bot) => {
        if (!bot.smart.vars.work) return

        while (farmerExp.checkBrokenTools(bot)) {
            await farmerExp.swapToolToOffHand(bot)
            await farmerExp.waitToRepair(bot)
            await farmerExp.swapIfRepaired(bot)
            await func.delay(1000)
        }
        await farmerExp.swapClanStorage(bot)
        await func.delay(10000)
    },

    /**
     * Чинит все инструменты до выключения
     * @param bot
     * @param status
     * @returns {Promise<void>}
     */
    repairBot: async (bot, status) => {
        if (!bot.smart.vars.work) return

        if (bot.smart.vars.script.auto_repair && status === false) bot.smart.vars.script.auto_repair = false
        else if (!bot.smart.vars.script.auto_repair && status === true) bot.smart.vars.script.auto_repair = true
        else return

        while (bot.smart.vars.script.auto_repair) await farmerExp.repairAll(bot)
    }

}

export default farmerExp