import placeBlock from "../../Bots utils/placeBlock.js";
import inventory from "../../Bots utils/inventory.js";
import func from "../../Bots utils/function.js";
import window from "../../Bots utils/window.js";
import restackNW from "./restack.js";


const placeNW = {

    /**
     *
     * @param {import('mineflayer').Bot} bot
     * @param delay
     * @returns {Promise<void>}
     */
    placeOne: async (bot, delay) => {
        for (let i = 5; i >= 2; i--) {
            const block = bot.blockAt(bot.entity.position.offset(0,2,i))
            const targetBlock = bot.blockAt(bot.entity.position.offset(0,2,i-1))
            const blockSoulSand = bot.blockAt(bot.entity.position.offset(0,1,i-1))

            if (blockSoulSand.name !== "soul_sand") continue
            //if (targetBlock.name !== "air") continue

            if (bot.heldItem?.name !== "nether_wart") {
                if (inventory.getCountItem(bot.inventory.slots, "nether_wart" ) === 0 ) {
                    await func.delay(delay)
                    return
                }
                await inventory.equipHand(bot, inventory.getSlotItem(bot.inventory.slots, "nether_wart"))
            }




        }
    },

    placeALl: async (bot, delay) => {

        if (bot.smart.vars.script.nether_wart.last_coords_place === bot.entity.position.floored().x) return

        if (bot.smart.vars.script.nether_wart.last_coords_break !== bot.entity.position.floored().x) return

        await restackNW.restackLeftHand(bot)

        const pos = bot.entity.position

        if ((bot.blockAt(pos.offset(0,1,4).floored()).name !== "soul_sand") ||
            (bot.blockAt(pos.offset(0,1,3).floored()).name !== "soul_sand") ||
            (bot.blockAt(pos.offset(0,1,2).floored()).name !== "soul_sand") ||
            (bot.blockAt(pos.offset(0,1,1).floored()).name !== "soul_sand") ) return

        await placeBlock(bot, bot.blockAt(pos.offset(0,1,4)), 1, "nether_wart", 1)
        await func.delay(delay)

        await placeBlock(bot, bot.blockAt(pos.offset(0,2,4)), 2, "nether_wart",1)
        await func.delay(delay)

        await placeBlock(bot, bot.blockAt(pos.offset(0,2,3)), 2, "nether_wart",1)
        await func.delay(delay)

        await placeBlock(bot, bot.blockAt(pos.offset(0,2,2)), 2, "nether_wart",1)
        await func.delay(delay)

        bot.smart.vars.script.nether_wart.last_coords_place = bot.entity.position.floored().x


    },


    /**
     *
     * @param {import('mineflayer').Bot} bot
     * @param status
     * @param delay
     * @returns {Promise<void>}
     */
    clicker: async (bot, status = true, delay = 20) => {
        bot.smart.vars.script.nether_wart.place_clicker = status

        while (bot.smart.vars.script.nether_wart.place_clicker) {
            await placeNW.placeALl(bot, delay)
            await func.delay(10)

        }
    }


}

export default placeNW