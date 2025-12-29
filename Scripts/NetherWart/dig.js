import func from "../../Bots utils/function.js";
import inventory from "../../Bots utils/inventory.js";
import window from "../../Bots utils/window.js";
import digBlock from "../../Bots utils/digBlock.js";
import Vec3 from "vec3";

const digNW = {

    /**
     *
     * @param {import('mineflayer').Bot} bot
     * @param block
     */
    digPaketNW: (bot, block) => {
        func.output("1 пакет ")
        if (block?.name === "air") return func.output("1 пакет отмена")
        bot.swingArm("right")
        bot._client.write('block_dig', {
            status: 0, // 0 = start destroying
            location: block.position,
            face: 2,
        })
    },

    /**
     * Вскапывает следующий блок
     * @param {import('mineflayer').Bot} bot
     * @param delay
     * @returns {Promise<void>}
     */
    digAll: async (bot, delay) => {
        for (let i = 1; i <= 4; i++) {
            const block = bot.blockAt(bot.entity.position.offset(0,2,i).floored())
            console.log(block._properties)
            await inventory.equipHand(bot, inventory.getSlotItem(bot.inventory.slots, "netherite_axe"))
            if (block.name === "nether_wart" && block._properties?.age === 3) {
                func.output("иф сработал")

                if (bot.smart.vars.script.nether_wart.last_coords_break === bot.entity.position.floored().x) return func.output("хуйня колрды")
                digNW.digPaketNW(bot, block)

                await func.delay(delay)
            }


        }
        bot.smart.vars.script.nether_wart.last_coords_break = bot.entity.position.floored().x

    },

    /**
     *
     * @param {import('mineflayer').Bot} bot
     * @param active
     * @param delay
     * @returns {Promise<void>}
     */
    clicker: async (bot, active = true, delay = 20) => {
        bot.smart.vars.script.nether_wart.dig_clicker = active

        while (bot.smart.vars.script.nether_wart.dig_clicker) {
            await digNW.nextDig(bot, delay)
            await func.delay(10)
        }
    }


}

export default digNW