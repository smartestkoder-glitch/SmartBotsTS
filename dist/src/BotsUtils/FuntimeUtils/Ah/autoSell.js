import rubbish from "../../rubbish.js";
import window from "../../window.js";
import inventory from "../../inventory.js";
import func from "../../function.js";
import restart from "../../restart.js";
import autoBuy from "./autoBuy.js";
import antiAFK from "../antiAFK.js";
import event from "../../event.js";
import ahUtils from "./ahUtils";
import dbAutoSellSells from "../../../DataBase/AutoSellSells";
import getBotId from "../../MinUtils/getBotId";
const autoSell = {
    /**
     *
     * @param {import('mineflayer').Bot} bot
     * @param item
     * @param price
     * @param newVersion
     */
    sellOneItem: async (bot, item, price, newVersion = false) => {
        func.output(`Бот начинает продавать`, "dev", "green", "bold");
        if (bot.smart?.vars?.script?.autoSell?.boughtCountItem === 0) {
            func.output(`Бот хотел продать, но у него ничего не купили :(`, "dev", "yellow", "bold");
            return;
        }
        if (!bot.smart?.vars?.script?.autoSell?.boughtCountItem)
            return;
        await window.close(bot);
        await rubbish.all(bot, true, [item]);
        await antiAFK.randomLook(bot);
        await autoSell.freeSellLine(bot);
        const needItem = inventory.getSlotItem(bot.inventory.slots, item);
        if (!needItem)
            return autoSell.updateNeedToBuy(bot, true);
        const emptyOnSellLine = inventory.getSlotEmpty(bot.inventory.slots, 36, 44);
        if (!emptyOnSellLine)
            return restart.default(bot, "Ошибка очистки линии!");
        window.click(bot, needItem.slot);
        await func.delay(300);
        window.rightClick(bot, emptyOnSellLine);
        await func.delay(300);
        window.click(bot, needItem.slot);
        await func.delay(300);
        bot.setQuickBarSlot(emptyOnSellLine - 36);
        await func.delay(500);
        const sellSlot = bot.inventory.slots[bot.quickBarSlot + 36];
        if (sellSlot?.name !== item || sellSlot?.count !== 1)
            return restart.default(bot, "Неверный слот продажи!");
        bot.chat("/ah sell " + price);
        await func.delay(1000);
        bot.smart.vars.script.autoSell.boughtCountItem -= 1;
        func.output(`Бот закончил продавать!`, "dev", "green", "bold");
    },
    sellOneInvisOld: async (bot, priceSell) => {
        await autoSell.sellOneItem(bot, "potion", priceSell, false);
    },
    /**
     *
     * @param {import('mineflayer').Bot} bot
     * @param newVersion
     */
    resell: async (bot, newVersion = false) => {
        func.output(`Бот начинает перевыставлять предметы`, "dev", "green", "bold");
        const date = new Date();
        const lastResellTime = autoSell.getLastResellTime(bot);
        if (typeof lastResellTime !== "number")
            return func.output("Бот не обновил аукцион, так как хуйня с таймером!");
        if (date.getTime() - lastResellTime < 1000 * 60) {
            func.output(`Бот не обновил аукцион, так как время еще не пришло!`, "dev", "yellow", "bold");
            return;
        }
        await autoBuy.openAh(bot, "", true);
        window.click(bot, 46);
        await window.waitToChangeNameWindow(bot, 5000);
        await func.delay(500);
        if (bot.currentWindow?.slots[46]?.name !== "tipped_arrow")
            return restart.default(bot, "Аукцион не открылся для перевыставления!");
        window.click(bot, 52);
        await func.delay(1000);
        autoSell.updateDateResell(bot);
        const boughtCountItem = ahUtils.getBoughtCountItem(bot, newVersion);
        if (typeof boughtCountItem !== "number")
            return;
        autoSell.updateBoughtCountItem(bot, boughtCountItem);
        func.output(`У бота щас на аукционе ${boughtCountItem} пустых слотов!`, "dev", "green", "bold");
        //if (boughtCountItem > 0) return autoSell.sellOneItem(bot, item, price, potion, priceBuy, minBuyCount, minNeedCount, timeToBuy, timeToNextPage, minMoneyCount)
        await window.close(bot);
        func.output(`Бот перевыставил предметы!`, "dev", "green", "bold");
    },
    updateBoughtCountItem: (bot, count) => {
        if (bot.smart?.vars?.script?.autoSell?.boughtCountItem === undefined)
            return restart.default(bot, "Отсутствует кол-во купленных предметов(countboughtitem) в переменных бота!");
        bot.smart.vars.script.autoSell.boughtCountItem = count;
    },
    updateNeedToBuy: (bot, need = true) => {
        if (bot.smart?.vars?.script?.autoSell?.needToBuy === undefined)
            return restart.default(bot, "Отсутствует needtobuy переменных бота!");
        bot.smart.vars.script.autoSell.needToBuy = need;
    },
    updateDateResell: (bot) => {
        if (bot.smart?.vars?.script?.autoSell?.lastResell === undefined)
            return restart.default(bot, "Отсутствует lastresell в переменных бота!");
        bot.smart.vars.script.autoSell.lastResell = new Date().getTime();
    },
    getLastResellTime: (bot) => {
        if (bot.smart?.vars?.script?.autoSell?.lastResell === undefined)
            return restart.default(bot, "Отсутствует lastresell в переменных бота!");
        return bot.smart.vars.script.autoSell.lastResell;
    },
    /**
     *
     * @param {import('mineflayer').Bot} bot
     */
    freeSellLine: async (bot) => {
        let i = 0;
        while (!inventory.getSlotEmpty(bot.inventory.slots, 36, 44) && i < 9) {
            if (bot.inventory.slots[i + 36]) {
                window.shiftClick(bot, i + 36);
                await func.delay(200);
            }
            i++;
        }
        if (!inventory.getSlotEmpty(bot.inventory.slots, 36, 44)) {
            await restart.default(bot, "Слоты переполнены!");
        }
    },
    /**
     *
     * @param {import('mineflayer').Bot} bot
     */
    addSellDataHandler: (bot) => {
        event.message(bot, (mes) => {
            const mesClean = mes?.extra?.map((el) => el?.text)?.join("");
            if (mesClean?.startsWith("[☃] У Вас купили")) {
                const price = Number(mesClean.match(/\$[0-9,]+/)?.[0].replace(/\D/g, ""));
                dbAutoSellSells.create(getBotId(bot), mesClean, 0, "", price);
            }
        });
    },
    /*addSellAtBase: async (message :string) => {
        await prisma.sells.create({
            data: {
                message
            }
        })
    }*/
};
export default autoSell;
