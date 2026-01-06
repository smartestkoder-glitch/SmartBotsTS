import func from './function.js'
import event from './event.js'
import {Bot} from "mineflayer";

const translator = {
    chat: (bot :Bot, status :boolean) => {
        event.message(bot, (msg :any) => {
            if (status) {
                func.output(msg.toAnsi(), "ЧАТ")

            }
        })
    },
    spawn: (bot :Bot, text :string) => {
        event.spawn(bot, () => {
            func.output(text, "СПАВН")
        });
    },

    death: (bot :Bot, text :string) => {
        event.death(bot, () => {
            func.output(text, "СМЕРТЬ")
        });
    },

    end: (bot :Bot, text :string) => {
        event.end(bot, () => {
            func.output(text, "ОТКЛЮЧЕНИЕ")
        });
    },


    kick: (bot :Bot, text :string) => {
        event.kicked(bot, (reason :any) => {
            func.output(text + `
Причина:
${reason}`, "КИК")
        });
    },




}


export default translator