import inventory from "../../Bots utils/inventory.js";
import window from "../../Bots utils/window.js";
import func from "../../Bots utils/function.js";

const restackNW = {
    /**
     *
     * @param {import('mineflayer').Bot} bot
     */
    restackLeftHand: (bot) => {

        const leftHand = bot.inventory.slots[45]

        if (leftHand.name === "nether_wart" && leftHand.count > 10) return

        const netherWartSlot = inventory.getSlotItem(bot.inventory.slots, "nether_wart", undefined, undefined, 32)

        if (!netherWartSlot) return

        window.toLeftHand(bot, netherWartSlot.slot)

    }
}


export default restackNW