import func from "../../../Bots utils/function.js"
import inventory from "../../../Bots utils/inventory.js"
import window from "../../../Bots utils/window.js"
import threeTools from "./tools.js";

const threeBoneMeal = {
    /**
     *
     * @param {import('mineflayer').Bot} bot
     * @returns {Promise<void>}
     */
    equipBoneMeal: async (bot) => {
        if (!bot.smart.vars.work) return

        const boneMealSlot = inventory.getSlotItem(bot.inventory.slots, "bone_meal")

        if (!boneMealSlot) return await threeBoneMeal.craftBoneMeal(bot)

        await inventory.equipHand(bot, boneMealSlot)
    },

    /**
     *
     * @param {import('mineflayer').Bot} bot
     * @returns {Promise<void>}
     */
    craftBoneMeal: async (bot) => {
        if (!bot.smart.vars.work) return

        const bone = inventory.getSlotItem(bot.inventory.slots, "bone")

        if (!bone) return await threeBoneMeal.collectBoneFromChest(bot)

        window.click(bot, bone.slot)
        await func.delay(500)
        window.click(bot, 1)
        await func.delay(500)
        window.shiftClick(bot, 0)
        await func.delay(500)

        return await threeBoneMeal.equipBoneMeal(bot)

    },

    /**
     *
     * @param {import('mineflayer').Bot} bot
     */
    findChest: (bot) => {
        if (!bot.smart.vars.work) return

        let block = undefined
        for (let i = -3; i < 4; i++) {
            for (let j = -3; j < 4; j++) {
                for (let k = -3; k < 4; k++) {
                    block = bot.blockAt(bot.entity.position.floored().offset(i,j,k))
                    if (block?.name === "chest") return block
                }
            }
        }
    },

    /**
     *
     * @param {import('mineflayer').Bot} bot
     */
    collectBoneFromChest: async (bot) => {
        if (!bot.smart.vars.work) return

        let bone = undefined
        const chest = threeBoneMeal.findChest(bot)

        if (!chest) {
            bot.chat("/home chest")
            await func.delay(8000)
            return await threeBoneMeal.collectBoneFromChest(bot)
        }

        await bot.openChest(chest)
        await func.delay(1000)

        bone = inventory.getSlotItem(bot.currentWindow.slots, "bone", 0, 53, 64)
        if (!bone) {
            bot.closeWindow(bot.currentWindow)
            await func.delay(1000)
            func.output("Закончились кости в сундуке!", "АВТО-ДЕРЕВО-ПРОВЕРКА-КОСТЕЙ")
            return await threeBoneMeal.craftBoneMeal(bot)
        }

        window.shiftClick(bot, bone.slot)

        await func.delay(200)

        bot.closeWindow(bot.currentWindow)
        await func.delay(1000)

        return await threeBoneMeal.craftBoneMeal(bot)
    },

    /**
     *
     * @param {import('mineflayer').Bot} bot
     */
    findSeedling: (bot) => {
        if (!bot.smart.vars.work) return

        let block = undefined
        for (let i = -3; i < 4; i++) {
            for (let j = -3; j < 4; j++) {
                for (let k = -3; k < 4; k++) {
                    block = bot.blockAt(bot.entity.position.floored().offset(i,j,k))
                    if (block?.name === "dark_oak_sapling") return block
                }
            }
        }
    },

    findAllSeedling: (bot) => {
        if (!bot.smart.vars.work) return
        let block = undefined
        let seepling = []
        for (let i = -3; i < 4; i++) {
            for (let j = -3; j < 4; j++) {
                for (let k = -3; k < 4; k++) {
                    block = bot.blockAt(bot.entity.position.floored().offset(i,j,k))
                    if (block?.name === "dark_oak_sapling") seepling.push(block)
                }
            }
        }
        return seepling
    },

    /**
     *
     * @param {import('mineflayer').Bot} bot
     * @returns {Promise<void>}
     */
    useBoneMeal: async (bot) => {
        if (!bot.smart.vars.work) return
        if (threeBoneMeal.findAllSeedling(bot).length !== 4) return
        await threeBoneMeal.equipBoneMeal(bot)
        await func.delay(200)
        let seedling = threeBoneMeal.findSeedling(bot)
        while (seedling) {
            await threeBoneMeal.equipBoneMeal(bot)

            await bot.activateBlock(seedling).catch(() => {func.output("Ошибка использования костной муки", "ОШИБКА", true)})
            await func.delay(200)
            seedling = threeBoneMeal.findSeedling(bot)
        }
    }
}

export default threeBoneMeal