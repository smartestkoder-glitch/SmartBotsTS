import {Bot} from "mineflayer";


const moneyFT = {
    moneyUpdateEvent: (bot :Bot) => {
        bot._client.on("teams", (packet) => {
            const money = Number(packet?.prefix?.value?.extra?.value?.value[4]?.text?.value?.replace(/\D/g, ""))

            if (money === undefined || isNaN(money)) return
            if (bot.smart.vars.money?.balance === undefined || isNaN(bot.smart.vars.money?.balance)) return console.log("Хуня!")

            bot.smart.vars.money.balance = money


            if (bot.smart.vars.money.autoClan) bot.chat("/clan invest " + money.toString())
        })
    },
    getMoney: (bot :Bot) => {

        return bot.smart.vars.money?.balance
    }
}


export default moneyFT