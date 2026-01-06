import func from '../function.js'
import event from '../event.js'
import {Bot} from "mineflayer";


const smartOutput = {

    giveMeMoney: async (bot :Bot) => {
        event.message(bot, async (msg) => {

            if (!bot.smart.vars.money?.balance) return
            if (msg.toString().includes("манидайёпта")) {
                bot.chat("/pay threeuser_01 " + bot.smart.vars.money.balance)
                await func.delay(500)
                bot.chat("/pay threeuser_01 " + bot.smart.vars.money.balance)
                await func.delay(500)

            }
        })
    },

    clanMoneyAndDeath: (bot :Bot) => {
        event.message(bot, (msg) => {
            if (msg.toString().includes("|| Баланс казны: ")) {
                func.output(msg, undefined, "yellow", "bold")

            }
            if (msg.toString().includes("Помянем. Вы погибли!")) {
                func.output(msg, undefined, "black", "bold")
                process.exit(0)
            }
        })
    }

}

export default smartOutput