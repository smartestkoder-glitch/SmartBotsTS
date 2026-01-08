import connect from "./connect.js";
import dbBotsConfig from "../DataBase/botsConfig.js";
import restart from "./restart.js";
async function connectFromDB(botId) {
    try {
        const botCfg = await dbBotsConfig.get(botId);
        if (!botCfg)
            return restart.fatal("Бот не найден в базе данных!");
        const bot = await connect({
            proxy: botCfg.Proxy.proxy,
            username: botCfg.nick,
            server: botCfg.server,
            version: botCfg.version,
            settings: {
                anarchy: botCfg.settings?.anarchy,
                password: botCfg.settings?.password,
                script: botCfg.settings?.Scripts?.name,
                botId: botCfg.id
            }
        });
        return bot;
    }
    catch (e) {
        console.log(e);
        restart.defaultNoBot("Произошла ошибка при поиске бота!");
    }
}
export default connectFromDB;
