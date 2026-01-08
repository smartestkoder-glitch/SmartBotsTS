function getBotId(bot) {
    return bot.smart.vars.config.settings?.botId || -1;
}
export default getBotId;
