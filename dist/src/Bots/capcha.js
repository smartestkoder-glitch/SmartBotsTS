import botsUtils from "../BotsUtils/index.js";
const bot = await botsUtils.connectFromDB(1);
if (!bot)
    throw new Error("Бот не объявился!/не найден!");
await botsUtils.func.delay(1000);
