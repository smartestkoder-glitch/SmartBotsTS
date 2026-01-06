import func from "./function.js"
import {Bot} from "mineflayer";


const window = {


    /**
     *
     * @param {import('mineflayer').Bot} bot
     * @param slot
     */
    rightClick: (bot :Bot, slot :number) => {
        if (!bot.smart.vars.work) return

        bot.clickWindow(slot, 1, 0).catch((err) => {
        })
    },


    /**
     *
     * @param {import('mineflayer').Bot} bot
     * @param slot
     */
    shiftClick: (bot :Bot, slot :number) => {
        if (!bot.smart.vars.work) return
        if (!slot) return
        bot.clickWindow(slot, 0, 1).catch((err) => {
        })
    },
    /**
     *
     * @param {import('mineflayer').Bot} bot
     * @param slot
     */
    click: (bot :Bot, slot :number) => {
        if (!bot.smart.vars.work) return
        bot.clickWindow(slot, 0, 0).catch((err) => {
        })
    },
    /**
     *
     * @param {import('mineflayer').Bot} bot
     * @param slot
     */
    rubish: (bot :Bot, slot :number) => {
        if (!bot.smart.vars.work) return
        if (!slot) return
        bot.clickWindow(slot, 0, 4).catch((err) => {
        })
    },


    /**
     *
     * @param {import('mineflayer').Bot} bot
     * @param slot
     */
    toLeftHand: (bot :Bot, slot :number) => {

        bot._client.write("window_click", {
            "windowId": bot.currentWindow?.id || 0,
            "slot": slot,
            "mouseButton": 40,
            "action": 2,
            "mode": 2,
            "item": {"present": false}
        })


    },

    /**
     *
     * @param {import('mineflayer').Bot} bot
     * @param slot
     * @param item
     *
     *
     */
    checkSlot: (bot :Bot, slot :number, item :string) => {
        if (!bot.smart.vars.work) return

        return bot?.currentWindow?.slots[slot]?.name === item
    },

    /**
     * Ждет, пока появится нужный слот
     * @param {import('mineflayer').Bot} bot
     * @param slot
     * @param item
     * @param maxWait
     */
    waitToSlot: async (bot :Bot, slot :number, item :string, maxWait :number = 5000) => {

        let wait = 0
        while (bot.currentWindow?.slots[slot]?.name !== item) {
            if (wait > maxWait) return false
            await func.delay(10)
            wait += 10
        }
        return true
        //window.click(bot, slot)
    },


    /**
     *
     * @param {import('mineflayer').Bot} bot
     */
    close: async (bot :Bot) => {
        if (bot.currentWindow) bot.closeWindow(bot.currentWindow)
        while (bot.currentWindow) {
            await func.delay(50)
        }

    },


    /**
     * Ждать до открытия окна с определённым названием
     * @param bot
     * @param name
     * @param maxWait
     */
    waitToNameWindow: async (bot :Bot, name :string, maxWait = 5000) => {
        if (!bot.smart.vars.work) return

        let wait = 0
        while (window.getNameWindow(bot) !== name) {
            if (wait > maxWait) return false
            await func.delay(10)
            wait += 10
        }
        return true
    },


    /**
     * Ждать до изменения названия окна
     * @param bot
     * @param maxWait
     * @returns Promise
     */
    waitToChangeNameWindow: async (bot :Bot, maxWait = 5000) => {
        if (!bot.smart.vars.work) return

        const name = window.getNameWindow(bot)
        let wait = 0
        while (window.getNameWindow(bot) === name) {
            if (wait > maxWait) return false
            await func.delay(10)
            wait += 10
        }
        return true
    },


    /**
     * Ждать до изменения колиества слотов
     * @param bot
     * @param maxWait
     * @returns Promise
     */
    waitToChangeCountSlot: async (bot :Bot, maxWait = 5000) => {
        if (!bot.smart.vars.work) return

        const countSlot = bot?.currentWindow?.slots?.length
        let wait = 0
        while (countSlot === bot?.currentWindow?.slots?.length) {
            if (wait > maxWait) return false
            await func.delay(10)
            wait += 10
        }
        await func.delay(100)
        return true
    },

    /**
     * Получить название окна
     * @param {import('mineflayer').Bot} bot
     */
    getNameWindow: (bot :Bot) => {
        if (!bot.smart.vars.work) return

        const wind :any = bot.currentWindow?.title

        return wind?.value?.extra?.value?.value?.map((el: { text: { value: any; }; }) => el.text?.value)?.join("")
    },


    swapItem: async (bot :Bot, slot1 :number, slot2 :number) => {
        if (!bot.smart.vars.work) return

        if (slot1 === slot2) return
        window.click(bot, slot1)
        await func.delay(200)
        window.click(bot, slot2)
        await func.delay(200)
        window.click(bot, slot1)
        await func.delay(200)


    }
}

export default window