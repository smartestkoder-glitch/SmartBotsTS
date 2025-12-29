import func from "./../function.js"
import restart from "./restart.js";
import Vec3 from "vec3";
import autoInvisible from "./autoInvisible.js";
const restartAnarchy = {

    /**
     *
     * @param {import('mineflayer').Bot} bot
     * @returns {Promise<void>}
     */
    restartIfHub: async (bot) => {
        await func.delay(100)
        autoInvisible.checkEffect(bot)
        if (bot.entity?.position?.floored().toString() === new Vec3( { x: 0, y: 70, z: 0 }).toString()) {
            await func.delay(3000)
            //await restart.default(bot, "Перезаход на анку")
            bot.chat(bot.smart.vars.settings.anarchy)
            await func.delay(3000)
        }
    }
}

export default restartAnarchy