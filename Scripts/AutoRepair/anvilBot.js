import func from "../../Bots utils/function.js"
import window from "../../Bots utils/window.js"
import inventory from "../../Bots utils/inventory.js"
import tools from "../AutoThree/OneThreeSmartBot/tools.js"
import restart from "../../Bots utils/Funtime utils/restart.js";

const autoRepaitAnvil = {

    zapretRubbish: [
        "diamond_axe",
        "diamond_hoe",
        "emerald",
        "potion",
        "cherry_sapling",
        "stick"
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
            if (!slot || autoRepaitAnvil.zapretRubbish.includes(slot?.name)) continue
            //if (inventory.getCountItem(bot.inventory.slots, "stick") < 200) continue
            await bot.tossStack(slot)
            await func.delay(500)
        }
    },

    /**
     *
     * @param {import('mineflayer').Bot} bot
     * @returns {Promise<void>}
     */
    swapToolsCS: async (bot) => {
        if (!bot.smart.vars.work) return

        await func.delay(300)

        bot.chat("/clan storage")
        await window.waitToChangeCountSlot(bot, 10000)


        if (!bot.currentWindow) throw new Error("Не открылся КС! Вероятно, у бота пинг")
        const stick = inventory.getSlotItem(bot.currentWindow.slots.slice(0,54), "stick")

        if (inventory.getCountItem(bot.currentWindow.slots.slice(54), "stick") < 64 && stick) {
            window.shiftClick(bot, stick.slot)
            await func.delay(700)
        }
        const normalOrigTool = tools.findNormalOrigTool(bot.currentWindow?.slots?.slice(54))

        if (normalOrigTool) {

            window.shiftClick(bot, normalOrigTool.slot)
            await func.delay(700)

        }

        const brokenOrigTools = tools.findBrokenOrigTools(bot.currentWindow.slots.slice(0, 54))

        if (brokenOrigTools) window.shiftClick(bot, brokenOrigTools.slot)
        else {
            await func.delay(500)
            bot.closeWindow(bot.currentWindow)
            return await func.delay(5000)
        }

        await func.delay(700)

        bot.closeWindow(bot.currentWindow)
        await func.delay(1000)




    },

    /**
     *
     * @param {import('mineflayer').Bot} bot
     * @returns
     */
    findAnvil: (bot) => {
        if (!bot.smart.vars.work) return

        let block = undefined
        for (let i = -1; i < 2; i++) {
            for (let j = -1; j < 2; j++) {
                for (let k = -1; k < 2; k++) {
                    block = bot.blockAt(bot.entity.position.floored().offset(j,i,k))
                    if (block?.name === "anvil") return block
                }
            }
        }
        return false
    },


    /**
     * Крафтит изумрудный топор
     * @param {import('mineflayer').Bot} bot
     */
    craftEmeraldAxe: async (bot) => {

        if (!bot.smart.vars.work) return
        const emeraldCount = inventory.getCountItem(bot.inventory.slots, "emerald")
        const stickCount = inventory.getCountItem(bot.inventory.slots, "stick")

        if (emeraldCount < 3) await autoRepaitAnvil.buyEmerald(bot)
        if (stickCount < 2) return func.output("Палки закончились!")

        bot.chat("/crafts")
        //await window.waitToChangeCountSlot(bot, 10000)
        await window.waitToSlot(bot, 41, "emerald", 10000)
        window.click(bot, 41)

        await window.waitToSlot(bot, 23, "diamond_sword", 10000)
        window.click(bot, 23)

        await window.waitToSlot(bot, 22, "diamond_axe", 10000)
        window.click(bot, 22)

        await window.waitToSlot(bot, 26, "crafting_table", 10000)
        window.click(bot, 26)
        await func.delay(2000)

        bot.closeWindow(bot.currentWindow)
        await func.delay(1000)

    },

    /**
     * Крафтит изумрудную мотыгу
     * @param {import('mineflayer').Bot} bot
     */
    craftEmeraldHoe: async (bot) => {
        if (!bot.smart.vars.work) return

        const emeraldCount = inventory.getCountItem(bot.inventory.slots, "emerald")
        const stickCount = inventory.getCountItem(bot.inventory.slots, "stick")

        if (!emeraldCount || emeraldCount < 2) await autoRepaitAnvil.buyEmerald(bot)
        if (!stickCount || stickCount < 2) return func.output("Не, ну это пиздец! У бота блять палок нету. Короче пиздец, дай ему палки", "ПРОВЕРКА-ПАЛОК")

        bot.chat("/crafts")
        //await window.waitToChangeCountSlot(bot, 10000)

        await window.waitToSlot(bot, 41, "emerald", 10000)
        await window.click(bot, 41)

        await window.waitToSlot(bot, 23, "diamond_sword", 10000)
        await window.click(bot, 23)

        await window.waitToSlot(bot, 31, "diamond_hoe", 10000)
        await window.click(bot, 31)

        await window.waitToSlot(bot, 26, "crafting_table", 10000)
        await window.click(bot, 26)
        await func.delay(2000)
        bot.closeWindow(bot.currentWindow)
        await func.delay(1000)

    },

    /**
     * Покупает изумрду в /shop
     * @param {import("mineflayer").Bot} bot
     * @returns {Promise<void>}
     */
    buyEmerald: async (bot) => {
        if (!bot.smart.vars.work) return



        bot.chat("/shop")

        await window.waitToSlot(bot, 21, "gold_ingot", 10000)
        await window.click(bot, 21)

        await window.waitToSlot(bot, 21, "knowledge_book")
        await window.shiftClick(bot, 23)

        await func.delay(200)

        bot.closeWindow(bot.currentWindow)

        await func.delay(200)

    },

    /**
     * Объединяет 2 предмета в наковальне
     * @param {import('mineflayer').Bot} bot
     * @param item1
     * @param item2
     */
    joinInAnvil: async (bot, item1, item2) => {
        if (!bot.smart.vars.work) return

        await func.delay(300)

        if (bot.currentWindow?.slots?.length !== 39) return restart.default(bot, "Не открылся КС! Вероятно, у бота пинг")
        if (!item1 || !item2) return restart.default(bot, "Неверно передан предмет!")


        window.shiftClick(bot, item1.slot)
        await func.delay(500)

        window.shiftClick(bot, item2.slot)
        await func.delay(500)

        window.shiftClick(bot, 2)
        await func.delay(1000)

        bot.closeWindow(bot.currentWindow)
        await func.delay(1000)

    },

    /**
     *
     * @param {import('mineflayer').Bot} bot
     * @returns {Promise<void>}
     */
    repairTool: async (bot) => {
        if (!bot.smart.vars.work) return
        const yaw = bot.entity.yaw
        const pitch = bot.entity.pitch
        await bot.look(3.726644004499725, 0.09948431331170005)
        await func.delay(500)
        await autoRepaitAnvil.rubbish(bot)
        await func.delay(500)

        await bot.look(yaw, pitch)
        await func.delay(500)
        await func.delay(300)

        let brokenTool = tools.findBrokenOrigTools(bot.inventory.slots)

        if (!brokenTool) {

            await autoRepaitAnvil.swapToolsCS(bot)
            await autoRepaitAnvil.repairTool(bot)
            return
        }
        if (brokenTool.name === "diamond_axe") {
            if(!tools.findEmeraldTools(bot.inventory.slots).axe) await autoRepaitAnvil.craftEmeraldAxe(bot)

            const anvil = autoRepaitAnvil.findAnvil(bot)

            if (!anvil) return restart.default("Наковальня не найдена!")
            await bot.openAnvil(anvil)

            await func.delay(300)

            if (!bot.currentWindow) {
                await func.delay(5000)
                return
            }

            brokenTool = tools.findBrokenOrigTools(bot.currentWindow.slots)
            const emeraldTool = tools.findEmeraldTools(bot.currentWindow.slots).axe

            if (!brokenTool || !emeraldTool) {
                await func.delay(1000)
                bot.closeWindow(bot.currentWindow)
                await func.delay(1000)

                return
            }

            await autoRepaitAnvil.joinInAnvil(bot, emeraldTool, brokenTool)

        }

        if (brokenTool.name === "diamond_hoe") {
            if(!tools.findEmeraldTools(bot.inventory.slots).hoe) await autoRepaitAnvil.craftEmeraldHoe(bot)

            const anvil = autoRepaitAnvil.findAnvil(bot)

            if (!anvil) return restart.default("Наковальня не найдена!")

            await bot.openAnvil(anvil)

            await func.delay(300)

            if (!bot.currentWindow) {
                await func.delay(5000)
                return
            }

            brokenTool = tools.findBrokenOrigTools(bot.currentWindow.slots)
            const emeraldTool = tools.findEmeraldTools(bot.currentWindow.slots).hoe
            if (!brokenTool || !emeraldTool) {
                await func.delay(2000)
                bot.closeWindow(bot.currentWindow)
                await func.delay(2000)

                return
            }
            await autoRepaitAnvil.joinInAnvil(bot, emeraldTool, brokenTool)

        }
    }
}

export default autoRepaitAnvil