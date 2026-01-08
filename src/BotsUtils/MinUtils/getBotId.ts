import {Bot} from "mineflayer";
function getBotId(bot : Bot) {
    return bot.smart.vars.config.settings?.botId || -1
}
export default getBotId