import func from "../../BotsUtils/function.js"
import {Bot} from "mineflayer";

const autoClanInvest = {


    investIfHave: async (bot: Bot) => {
        if (!bot.smart.vars.work) return
        const minMoney = bot.smart.vars.default?.minClanInvest
        const money = bot.smart.vars.money?.balance

        if (!minMoney || !money) return

        if (money >= minMoney) {
            await func.delay(300)
            bot.chat("/clan invest " + minMoney)
            await func.delay(500)
        }
    },


    investAll: async (bot: Bot) => {
        bot.on("messagestr", async (mes) => {
            if (mes.startsWith("[⚔]")) return
            const money = bot.smart.vars.money?.balance

            if (money === undefined || money === 0 || isNaN(money)) return

            console.log(money)
            bot.chat("/clan invest " + money)
            await func.delay(10000)
        })
    }


}

export default autoClanInvest