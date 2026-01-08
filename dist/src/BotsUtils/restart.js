import func from "./function.js";
import connectFromDB from "./connectFromDB.js";
import getBotId from "./MinUtils/getBotId.js";
const restart = {
    default: async (bot, msg = "!Не определена!") => {
        bot._client.socket.destroy();
        func.output(`Бота с ником ${bot.username} был кикнут по причине: ` + msg, undefined, "red", "bold");
    },
    fatal: (mes) => {
        func.output(mes, "", "red", "bold");
    },
    restartBot: async (bot) => {
        bot.removeAllListeners();
        bot._client.removeAllListeners();
        bot.smart.vars.work = false;
        await func.delay(500);
        await func.delay(30000);
        await connectFromDB(getBotId(bot));
    },
    defaultNoBot: async (msg = "!Не определена!") => {
        func.output(`Произошла ошибка: ` + msg, undefined, "red", "bold");
        process.exit(0);
        //await func.delay(500)
        //await func.delay(30000)
        //await connect(bot.smart.vars.settings.username, bot.smart.vars.settings.server, bot.smart.vars.settings.anarchy, bot.smart.vars.script.threeBot.anarchyRepait, bot.smart.vars.settings.version, bot.smart.vars.settings.port, bot.smart.vars.settings.proxy, bot.smart.vars.settings.script)
        //bot = null
    },
};
export default restart;
