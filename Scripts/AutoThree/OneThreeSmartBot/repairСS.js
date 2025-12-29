import func from "../../../Bots utils/function.js"
import inventory from "../../../Bots utils/inventory.js"
import window from "../../../Bots utils/window.js"
import use from "../../../Bots utils/use.js"
import item from "../../../Bots utils/item.js";
import autoRubbish from "./rubbish.js";
import autoListva from "./autoListva.js";
import threeTools from "./tools.js";
import restart from "../../../Bots utils/Funtime utils/restart.js";
import tools from "./tools.js";


const repairCS = {

    /**
     *
     * @param {import('mineflayer').Bot} bot
     * @param nameTool
     * @returns {Promise<void>}
     */
    swapToolCS: async (bot, nameTool) => {
        if (!bot.smart.vars.work) return
        await func.delay(300)

        let brokenOrigTool = tools.findBrokenOrigTools(bot.inventory.slots)
        let normalOrigTool = tools.findAllNormalOrigTools(bot.inventory.slots)

        if (!brokenOrigTool && normalOrigTool.length !== 0) return

        bot.chat("/clan storage")
        await window.waitToChangeCountSlot(bot, 10000)

        if (!bot.currentWindow) return restart.default(bot, "Не открылся КС! Вероятно, у бота пинг")

        brokenOrigTool = tools.findBrokenOrigTools(bot.currentWindow.slots.slice(54))
        let normalOrigToolCS = tools.findAllNormalOrigTools(bot.currentWindow.slots.slice(0,54)).find(el => el.name === nameTool)

        await func.delay(300)
        if (brokenOrigTool) {
            window.shiftClick(bot, brokenOrigTool.slot)
            await func.delay(700)
        }

        if (normalOrigTool.length === 0 && normalOrigToolCS) {
            window.shiftClick(bot, normalOrigToolCS.slot)
            await func.delay(700)
        }

        await func.delay(500)
        bot.closeWindow(bot.currentWindow)
        await func.delay(1000)
    }


}

export default repairCS