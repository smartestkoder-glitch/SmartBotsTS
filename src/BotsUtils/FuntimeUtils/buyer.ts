import func from '../function.js'
import window from '../window.js'
import {Bot} from "mineflayer";

const buyer =  {

    /**
     *
     * @param {import('mineflayer').Bot} bot
     * @param slot1
     * @param item1
     * @param slot2
     * @param item2
     */
    sell: async (bot :Bot, slot1 :number, item1 :string, slot2 :number, item2 :string) => {
        if (!bot.smart.vars.work) return

        bot.chat("/buyer")
        await window.waitToSlot(bot, slot1, item1)
        window.click(bot, slot1)
        await window.waitToSlot(bot, slot2, item2)
        window.click(bot, slot2)
        await func.delay(1000)
        if (bot.currentWindow) bot.closeWindow(bot.currentWindow)
    },
    /**
     *
     * @param {import('mineflayer').Bot} bot
     * @param slot1
     * @param item1
     * @param slot2
     * @param item2
     * @param status
     */
    autobuyer: async (bot :Bot, slot1 :number, item1 :string, slot2 :number , item2 :string, status :boolean) => {
        if (!bot.smart.vars.work) return

        bot.chat("/buyer")
        await window.waitToSlot(bot, slot1, item1)

        if (!bot.currentWindow) return
        window.click(bot, slot1)
        await window.waitToSlot(bot, slot2, item2)
        if (status && buyer.getAutoItem(bot.currentWindow.slots[slot2])
            || !status && !buyer.getAutoItem(bot.currentWindow.slots[slot2])) {
            window.rubish(bot, slot2)
        }
        bot.closeWindow(bot.currentWindow)
        await func.delay(100)

    },


    getAutoItem: (item :any) => {

        return JSON.parse(item?.nbt?.value?.display?.value?.Lore?.value?.value[4])?.extra?.map((el: { text: any; }) => el.text).join("").includes("включен")
    }

}

export default buyer