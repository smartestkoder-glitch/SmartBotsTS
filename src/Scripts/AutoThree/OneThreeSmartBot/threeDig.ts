import func from "../../../Bots utils/function.js"
import inventory from "../../../Bots utils/inventory.js"
import item from "../../../Bots utils/item.js"
import window from "../../../Bots utils/window.js"
import repairS from "./repairСS.js"
import threeTools from "./tools.js";
import repairCS from "./repairСS.js";

const threeDig = {

    /**
     *
     * @param {import('mineflayer').Bot} bot
     * @returns {Block}
     */
    findThree: (bot) => {
        if (!bot.smart.vars.work) return

        let block = undefined
        for (let i = -3; i < 1; i++) {
            for (let j = -3; j < 4; j++) {
                for (let k = -3; k < 4; k++) {
                    block = bot.blockAt(bot.entity.position.floored().offset(j,i,k))
                    if (block?.name === "cherry_log") return block
                }
            }
        }
    },

    /**
     *
     * @param {import('mineflayer').Bot} bot
     * @returns {Promise<void>}
     */
    equipAxe: async (bot) => {
        if (!bot.smart.vars.work) return

        const axe = threeTools.findOrigTools(bot.inventory.slots).axe

        if (!axe) {
            await func.delay(10000)
            await repairCS.swapToolCS(bot, "diamond_axe")
            return await threeDig.equipAxe(bot)
        }

        if (item.getDurability.unit(axe) < 450) {

            await repairS.swapToolCS(bot, "diamond_axe")
            return await threeDig.equipAxe(bot)
        }

        await inventory.equipHand(bot, axe)
        await func.delay(500)

        if (bot.heldItem?.name !== "diamond_axe") {
            return await threeDig.equipAxe(bot)

        }
    },

    /**
     *
     * @param {import('mineflayer').Bot} bot
     * @returns {Promise<void>}
     */
    digThree: async (bot) => {
        if (!bot.smart.vars.work) return
        await func.delay(100)

        let threeBlock = threeDig.findThree(bot)
        while(threeBlock) {

            if (!threeBlock) return

            await threeDig.equipAxe(bot)
            await bot.dig(threeBlock, true)
            await func.delay(500)
            threeBlock = threeDig.findThree(bot)
        }
        //await func.delay(2000)
    },


    /**
     *
     * @param {import('mineflayer').Bot} bot
     * @returns {Promise<void>}
     */
    saveItem: async (bot) => {
        while (bot.smart.vars.work) {

            if (item.getDurability.unit(bot.heldItem) < 300) {
                if (bot.quickBarSlot !== 4) bot.setQuickBarSlot(8-bot.quickBarSlot)
                else bot.setQuickBarSlot(2)
                //func.output("Засейвил топор! Саня красавчик")
                await func.delay(500)
            }
            await func.delay(100)
        }
    }




}

export default threeDig