import dbFunc from "../DataBase/index.js";
import getBotId from "./MinUtils/getBotId.js";
const saveEvents = {
    /**
     *
     * @param {import('mineflayer').Bot} bot
     */
    chat: async (bot) => {
        bot.on("message", async (mes) => {
            const mesClean = mes?.extra?.map((el) => el?.text)?.join("");
            await saveEvents.saveChatMessage(bot, mesClean, mes);
        });
    },
    saveChatMessage: async (bot, cleanMessage, jsonMessage) => {
        try {
            const botId = getBotId(bot);
            if (!botId)
                return;
            await dbFunc.chatMessages.create(botId, JSON.stringify(jsonMessage), cleanMessage);
        }
        catch (e) {
            console.log(e);
        }
    },
    death: async (bot) => {
        bot.on("death", async () => {
            await saveEvents.saveDeath(bot);
        });
    },
    saveDeath: async (bot) => {
        try {
            const botId = getBotId(bot);
            if (!botId)
                return;
            await dbFunc.deaths.create(botId);
        }
        catch (e) {
            console.log(e);
        }
    },
    kick: async (bot) => {
        bot.on("kicked", async (mes) => {
            const mesClean = mes?.value?.extra?.value?.value?.map((el) => el?.text?.value)?.join("");
            await saveEvents.saveKick(bot, mesClean, JSON.stringify(mes));
        });
    },
    saveKick: async (bot, cleanMessage, jsonMessage) => {
        try {
            const botId = getBotId(bot);
            if (!botId)
                return;
            await dbFunc.kicks.create(botId, jsonMessage, cleanMessage);
        }
        catch (e) {
            console.log(e);
        }
    }
};
export default saveEvents;
