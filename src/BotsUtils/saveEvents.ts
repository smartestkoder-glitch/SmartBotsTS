import {Bot} from "mineflayer";
import dbFunc from "../DataBase/index.js";
import getBotId from "./MinUtils/getBotId.js";


const saveEvents = {

    /**
     *
     * @param {import('mineflayer').Bot} bot
     */
    chat: async (bot :Bot) => {
        bot.on("message", async (mes :any) => {
            const mesClean = mes?.extra?.map((el: { text: any; }) => el?.text)?.join("")

            await saveEvents.saveChatMessage(bot, mesClean, mes)

        })
    },

    saveChatMessage: async (bot :Bot, cleanMessage :string, jsonMessage :any) => {
        try {
            const botId = getBotId(bot)
            if (!botId) return
            await dbFunc.chatMessages.create(botId, JSON.stringify(jsonMessage), cleanMessage)
        }
        catch (e) {
            console.log(e)
        }
    },

    death: async (bot: Bot) => {
        bot.on("death", async () => {
            await saveEvents.saveDeath(bot)
        })
    },

    saveDeath: async (bot :Bot) => {
        try {
            const botId = getBotId(bot)
            if (!botId) return
            await dbFunc.deaths.create(botId)
        }
        catch (e) {
            console.log(e)
        }
    },

    kick: async (bot :Bot) => {
        bot.on("kicked", async (mes :any) => {
            const mesClean = mes?.value?.extra?.value?.value?.map((el: { text: any; }) => el?.text?.value)?.join("")

            await saveEvents.saveKick(bot, mesClean, JSON.stringify(mes))
        })
    },

    saveKick: async (bot: Bot, cleanMessage: string, jsonMessage: string) => {
        try {
            const botId = getBotId(bot)
            if (!botId) return
            await dbFunc.kicks.create(botId, jsonMessage, cleanMessage)
        }
        catch (e) {
            console.log(e)
        }
    }

}

export default saveEvents