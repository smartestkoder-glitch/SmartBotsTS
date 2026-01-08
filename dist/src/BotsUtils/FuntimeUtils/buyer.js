import func from '../function.js';
import window from '../window.js';
const buyer = {
    /**
     *
     * @param {import('mineflayer').Bot} bot
     * @param slot1
     * @param item1
     * @param slot2
     * @param item2
     */
    sell: async (bot, slot1, item1, slot2, item2) => {
        if (!bot.smart.vars.work)
            return;
        bot.chat("/buyer");
        await window.waitToSlot(bot, slot1, item1);
        window.click(bot, slot1);
        await window.waitToSlot(bot, slot2, item2);
        window.click(bot, slot2);
        await func.delay(1000);
        if (bot.currentWindow)
            bot.closeWindow(bot.currentWindow);
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
    autobuyer: async (bot, slot1, item1, slot2, item2, status) => {
        if (!bot.smart.vars.work)
            return;
        bot.chat("/buyer");
        await window.waitToSlot(bot, slot1, item1);
        if (!bot.currentWindow)
            return;
        window.click(bot, slot1);
        await window.waitToSlot(bot, slot2, item2);
        if (status && buyer.getAutoItem(bot.currentWindow.slots[slot2])
            || !status && !buyer.getAutoItem(bot.currentWindow.slots[slot2])) {
            window.rubish(bot, slot2);
        }
        bot.closeWindow(bot.currentWindow);
        await func.delay(100);
    },
    getAutoItem: (item) => {
        return JSON.parse(item?.nbt?.value?.display?.value?.Lore?.value?.value[4])?.extra?.map((el) => el.text).join("").includes("включен");
    }
};
export default buyer;
