import func from "./function.js";
import {Bot} from "mineflayer";


const saveEvents = {

    /**
     *
     * @param {import('mineflayer').Bot} bot
     */
    chat: async (bot :Bot) => {
        bot.on("message", async (mes :any) => {
            const mesClean = mes?.extra?.map((el: { text: any; }) => el?.text)?.join("")

        })
    },

    saveChatMessage: async (cleanMessage, jsonMessage) => {
        try {
            await prisma.chatMessages.create({
                data: {
                    text: cleanMessage,
                    json: jsonMessage
                }
            })
        }
        catch (e) {
            func.output(e.toString(), undefined, "red", "bold")
        }
    }

}

export default saveEvents