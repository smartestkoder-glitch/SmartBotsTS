import func from "../../Bots utils/function.js";
import digNW from "./dig.js";
import placeNW from "./place.js";
import move from "../../Bots utils/move.js";


const scriptNW = {

    /**
     *
     * @param {import('mineflayer').Bot} bot
     * @param dig
     * @returns {Promise<void>}
     */
    go: async (bot, dig) => {

        if (dig) digNW.clicker(bot, true, 10)
        if (!dig) placeNW.clicker(bot, true, 10)

        func.output("123")

        for (let i = 0; i < 3; i++) {
            await move.time.right(bot, 10000)
            await move.time.back(bot, 2000)
            await move.time.left(bot, 10000)
            await move.time.back(bot, 2000)
        }

        await move.time.right(bot, 10000)
        await move.time.back(bot, 2000)
        await move.time.left(bot, 10000)



        if (dig) digNW.clicker(bot, false, 10)
        if (!dig) placeNW.clicker(bot, false, 10)

    },

    start: async (bot) => {

    }

}

export default scriptNW