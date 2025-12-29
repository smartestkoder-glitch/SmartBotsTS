import func from "../function.js";
import events from "../event.js";

const teleport = {

    /**
     *
     * @param {import('mineflayer').Bot} bot
     * @param mes
     * @returns {Promise<void>}
     */
    waitTeleport: async (bot, mes) => {
        await func.delay(1000)
    },


    /**
     *
     * @param {import('mineflayer').Bot} bot
     */
    getNextMessage: async (bot) => {
        return bot.players
    }
}

export default teleport