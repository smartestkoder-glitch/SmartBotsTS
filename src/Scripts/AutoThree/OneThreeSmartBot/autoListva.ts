import func from "../../../Bots utils/function.js"
import inventory from "../../../Bots utils/inventory.js"
import window from "../../../Bots utils/window.js"
import item from "../../../Bots utils/item.js";
import repairS from "./repairСS.js";
import threeTools from "./tools.js";
import repairCS from "./repairСS.js";
import autoInvisible from "../../../Bots utils/Funtime utils/autoInvisible.js";
import restart from "../../../Bots utils/Funtime utils/restart.js";

const autoListva = {


    zapretRubbish: [
        "diamond_axe",
        "diamond_hoe",
        "emerald",
        "potion",
        "cherry_sapling",
        "cooked_porkchop"
    ],

    /**
     *
     * @param {import('mineflayer').Bot} bot
     * @returns {Promise<void>}
     */
    rubbish: async (bot) => {
        if (!bot.smart.vars.work) return

        await func.delay(300)

        for (const slot of bot.inventory.slots) {
            if (!slot || autoListva.zapretRubbish.includes(slot?.name)) continue
            //if (inventory.getCountItem(bot.inventory.slots, "stick") < 200) continue
            //if (inventory.getCountItem(bot.inventory.slots, "cherry_sapling") < 51) continue
            await bot.tossStack(slot)
            await func.delay(500)
        }
    },

    /**
     *
     * @param {import('mineflayer').Bot} bot
     */
    findListva: async (bot) => {
        if (!bot.smart.vars.work) return

        let block = undefined


        for (let m = 1; m < 5; m++) {
            for (let i = 0-m; i < m+1; i++) {
                for (let j = 0-m; j < m+1; j++) {
                    for (let k = 0-m; k < m+1; k++) {
                        if (inventory.getCountItem(bot.inventory.slots, "cherry_sapling") > 48) await autoListva.putSeedlingInCS(bot)
                        block = bot.blockAt(bot.entity.position.floored().offset(j, k, i))
                        if (!bot.canDigBlock(block)) continue
                        if (j === 0 && k === -1 && i === 0) continue
                        if (block?.name === "cherry_leaves") return block
                    }
                }
            }
        }
    },

    /**
     *
     * @param {import('mineflayer').Bot} bot
     */
    equipHoe: async (bot) => {
        if (!bot.smart.vars.work) return

        const hoe = threeTools.findOrigTools(bot.inventory.slots).hoe


        if (!hoe) {
            await func.delay(10000)
            await repairCS.swapToolCS(bot, "diamond_hoe")
            return
        }
        if (item.getDurability.unit(hoe) < 100) {

            await repairS.swapToolCS(bot, "diamond_hoe")
            return await autoListva.equipHoe(bot)
        }

        await inventory.equipHand(bot, hoe)
        if (bot.heldItem.name !== "diamond_hoe") return await autoListva.equipHoe(bot)

    },

    /**
     *
     * @param {import('mineflayer').Bot} bot
     * @returns {Promise<void>}
     */
    breakListva: async (bot) => {
        if (!bot.smart.vars.work) return
        await func.delay(100)


        let listvaBlock = await autoListva.findListva(bot)

        while (listvaBlock) {
            await autoInvisible.drinkIfTime(bot, 31)
            await autoListva.equipHoe(bot)
            await bot.dig(listvaBlock, true).catch(() => {})

            await func.delay(50)
            listvaBlock = await autoListva.findListva(bot)

        }
    },

    /**
     *
     * @param {import('mineflayer').Bot} bot
     * @returns {Promise<void>}
     */
    putSeedlingInCS: async (bot) => {
        if (!bot.smart.vars.work) return

        await func.delay(300)
        let seedling = inventory.getSlotItem(bot.inventory.slots, "cherry_sapling")

        if (!seedling) return

        bot.chat("/clan storage")
        await window.waitToChangeCountSlot(bot, 10000)

        if (!bot.currentWindow) return

        const stick = inventory.getSlotItem(bot.currentWindow.slots.slice(54), "stick")
        if (inventory.getCountItem(bot.currentWindow.slots.slice(1, 54), "stick") < 200 && stick) {

            window.shiftClick(bot, stick.slot)
            await func.delay(700)
        }

        seedling = inventory.getSlotItem(bot.currentWindow?.slots, "cherry_sapling", 53, 89)
        if (!seedling) return restart.default(bot)
        if (inventory.getCountItem(bot.currentWindow.slots.slice(0, 54), "cherry_sapling") < 300) window.shiftClick(bot, seedling.slot)

        await func.delay(500)

        bot.closeWindow(bot.currentWindow)

        await func.delay(1000)
        if (inventory.getCountItem(bot.inventory.slots, "stick") < 300) return
        await bot.look(3.726644004499725, 0.09948431331170005)
        await func.delay(1000)
        await autoListva.rubbish(bot)
        await func.delay(1000)

    }


}

export default autoListva