import func from '../function.js'
import inventory from '../inventory.js'
import use from '../use.js'
import {Bot} from "mineflayer";


const eatID = {
    cookedPorkchop: {
        id: "cooked_porkchop",
        restores: 8
    }
}

const autoEat = {
    /**
     *
     * @param {import('mineflayer').Bot} bot
     */
    transferAndEat: async (bot :Bot) => {
        if (!bot.smart.vars.work) return
        await func.delay(300)

        const slotFood = inventory.getSlotItem(bot.inventory.slots, eatID.cookedPorkchop.id)



        if (!slotFood) return func.output(`Еда отсутствует в инвентаре!`, undefined, "red", "bold")

        await inventory.equipHand(bot, slotFood)

        await use.time(bot, 2300)
        await func.delay(1000)

        func.output(`Бот поел! Текущий голод у бота: ${bot.food}`, undefined, "green", "bold")
        await func.delay(300)

    },


    checkFoodAndEat: async (bot :Bot, minFood = 10) => {
        if (!bot.smart.vars.work) return

        if (bot.food <= minFood) await autoEat.transferAndEat(bot)
        //else return func.output(`Бот еще не достаточно проголодался! Текущий уровень голода: ${bot.food}`, undefined, "green", "bold")
    }
}

export default autoEat