
import look from "../look.js";
import {Bot} from "mineflayer";

const antiAFK = {

    /**
     *
     * @param {import('mineflayer').Bot} bot
     */
    randomLook: async (bot :Bot) => {

        const randomYaw =  (Math.random() - 0.5) * 2 * 180
        const randomPitch = (Math.random() - 0.5) * 2 * 90

        look.look(bot, randomYaw, randomPitch)
    }

}

export default antiAFK