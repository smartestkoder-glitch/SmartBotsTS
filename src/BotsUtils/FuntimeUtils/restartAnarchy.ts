import func from "./../function.js"
import {Vec3} from "vec3";
import autoInvisible from "./autoInvisible.js";
import {Bot} from "mineflayer";
const restartAnarchy = {

    /**
     *
     * @param {import('mineflayer').Bot} bot
     */
    restartIfHub: async (bot :Bot) => {
        await func.delay(100)
        autoInvisible.checkEffect(bot)
        if (bot.entity?.position?.floored().toString() === new Vec3( 0, 70, 0 ).toString()) {
            await func.delay(3000)
            //await restart.default(bot, "Перезаход на анку")
            if (!bot.smart.vars.config.settings?.anarchy) return
            bot.chat(bot.smart.vars.config.settings.anarchy)
            await func.delay(3000)
        }
    }
}

export default restartAnarchy