import func from "../../../Bots utils/function.js"
import inventory from "../../../Bots utils/inventory.js"
import Vec3 from "vec3";
import threeTools from "./tools.js";
import window from "../../../Bots utils/window.js";
import restart from "../../../Bots utils/Funtime utils/restart.js";



const placeSeedling = {
    /**
     *
     * @param {import('mineflayer').Bot} bot
     * @param freeUp
     */
    findDirt: (bot, freeUp = false) => {
        if (!bot.smart.vars.work) return

        let blockDirt = undefined
        let blockUpDirt = undefined
        let dirt = []
        for (let i = -3; i < 4; i++) {
            for (let j = -3; j < 4; j++) {
                for (let k = -3; k < 4; k++) {
                    blockDirt = bot.blockAt(bot.entity.position.floored().offset(i,j,k))
                    blockUpDirt = bot.blockAt(bot.entity.position.floored().offset(i,j+1,k))
                    if (blockDirt?.name === "dirt" && (!freeUp || blockUpDirt?.name === "air")) dirt.push(blockDirt)
                }
            }
        }
        return dirt
    },

    /**
     *
     * @param {import('mineflayer').Bot} bot
     * @returns {Promise<void>}
     */
    equipSeedling: async (bot) => {
        if (!bot.smart.vars.work) return

        const seedlingSlot = inventory.getSlotItem(bot.inventory.slots, "cherry_sapling")
        if (!seedlingSlot) {

            await placeSeedling.collectSeedlingInCS(bot)

            return await placeSeedling.equipSeedling(bot)
        }
        await inventory.equipHand(bot, seedlingSlot)
    },

    /**
     *
     * @param {import('mineflayer').Bot} bot
     * @returns {Promise<void>}
     */
    collectSeedlingInCS: async (bot) => {
        await func.delay(300)
        bot.chat("/clan storage")
        await window.waitToChangeCountSlot(bot, 10000)

        const seedling = inventory.getSlotItem(bot.currentWindow?.slots, "cherry_sapling", 0, 53)

        if (!seedling) return await restart.default(bot, "У бота нету саженцев")

        window.shiftClick(bot, seedling.slot)
        await func.delay(500)

        bot.closeWindow(bot.currentWindow)
        await func.delay(1000)
    },

    /**
     *
     * @param {import('mineflayer').Bot} bot
     */
    placeSeedingFull: async (bot) => {
        if (!bot.smart.vars.work) return

        await func.delay(100)

        const dirt = placeSeedling.findDirt(bot, true)
        if (!dirt) return
        await placeSeedling.equipSeedling(bot)

        await placeSeedling.placeSeedlingJust(bot, dirt)

        if (placeSeedling.findDirt(bot, true) && placeSeedling.findDirt(bot, true).length > 0) await placeSeedling.placeSeedingFull(bot)
    },

    /**
     *
     * @param {import('mineflayer').Bot} bot
     * @param blocks
     */
    placeSeedlingJust: async (bot, blocks) => {
        if (!bot.smart.vars.work) return

        for (const block of blocks) {
            if (bot.heldItem?.name !== "cherry_sapling") {

                await func.delay(1000)
                return
            }
            await bot.placeBlock(block, new Vec3(0,1,0)).catch(() => {})
            await func.delay(30)
        }
    }
}

export default placeSeedling