import func from "../../Bots utils/function.js";
import inventory from "../../Bots utils/inventory.js";
import window from "../../Bots utils/window.js";
const sellAuto = {
    /**
     *
     * @param {import('mineflayer').Bot} bot
     * @param maxSlot
     * @returns {Promise<void>}
     */
    collectLastItem: async (bot, maxSlot) => {
        if (!bot.smart.vars.work)
            return;
        func.output("Начинаю забирать последний предмет...");
        bot.chat("/ah");
        await window.waitToChangeCountSlot(bot, 5000);
        await func.delay(800);
        window.click(bot, 46);
        await window.waitToSlot(bot, 30, undefined, 5000);
        await func.delay(800);
        window.click(bot, maxSlot);
        await window.waitToSlot(bot, maxSlot, undefined, 5000);
        await func.delay(800);
        bot.closeWindow(bot.currentWindow);
        await func.delay(1000);
        func.output("Забрал!\n");
        await bot.look(3.726644004499725, 0.09948431331170005);
        await func.delay(1000);
        await bot.look(3.126644004499725, 0.29948431331170005);
        await func.delay(1000);
    },
    /**
     *
     * @param {import('mineflayer').Bot} bot
     * @param itemName
     * @param price
     * @returns {Promise<void>}
     */
    sell: async (bot, itemName, price) => {
        if (!bot.smart.vars.work)
            return;
        func.output("Начинаю продажу...");
        const item = inventory.getSlotItem(bot.inventory.slots, itemName);
        if (!item)
            return func.output(`Предмет ${itemName} закончился!`, undefined, "red", "bold");
        if (bot.heldItem)
            await window.shiftClick(bot, bot.heldItem.slot);
        //console.log(item.slot)
        //console.log(bot.quickBarSlot+27)
        window.click(bot, item.slot);
        await func.delay(1000);
        window.rightClick(bot, bot.quickBarSlot + 36);
        await func.delay(1000);
        window.click(bot, item.slot);
        await func.delay(1000);
        bot.chat(`/ah sell ${price}`);
        func.output("Продал!\n\n");
        await func.delay(1000);
    }
};
export default sellAuto;
