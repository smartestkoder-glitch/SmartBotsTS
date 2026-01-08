import func from './function.js';
import window from "./window.js";
const inventory = {
    restackItemShift: async (bot, item, fslot = 9, lslot = 35, kolvo = 0, maxsize = 64) => {
        if (!bot.smart.vars.work)
            return;
        if (kolvo === 0) {
            while ((inventory.getSlotEmpty(bot.inventory.slots, 36, 44) || !func.number.roundCheck(inventory.getCountItem(bot.inventory.slots, item, 36, 44) / maxsize)) && inventory.getSlotItem(bot.inventory.slots, item, fslot, lslot)) {
                const sl = inventory.getSlotItem(bot.inventory.slots, item, fslot, lslot)?.slot;
                if (!sl)
                    return;
                window.shiftClick(bot, sl);
                await func.delay(200);
            }
        }
        return true;
    },
    /**
     * Возвращает первый слот в котором есть нужный предмет
     * @param slots
     * @param item - Предмет, который найти
     * @param fslot - Первый слот, с которого начинать искать
     * @param lslot - Последний слот, на котором заканчивать искать
     * @param count
     */
    getSlotItem: (slots, item, fslot = 9, lslot = 45, count = 1) => {
        //if (!slots) return func.output("Спас от ошибки, саня молодец")
        return slots.slice(fslot, lslot + 1).find(slot => slot?.name === item && slot?.count >= count);
    },
    /**
     * Возвращает все слоты в которых есть нужный предмет
     * @param slots
     * @param item - Предмет, который найти
     * @param fslot - Первый слот, с которого начинать искать
     * @param lslot - Последний слот, на котором заканчивать искать
     */
    getAllSlotsItem: (slots, item, fslot = 9, lslot = 45) => {
        if (!slots)
            return func.output("Спас от ошибки, саня молодец");
        return slots.slice(fslot, lslot + 1).filter(slot => slot?.name === item);
    },
    /**
     * Возвращает первый пустой слот
     * @param slots
     * @param fslot - Первый слот, с которого начинать искать
     * @param lslot - Последний слот, на котором заканчивать искать
     */
    getSlotEmpty: (slots, fslot = 9, lslot = 45) => {
        if (!slots)
            return func.output("Спас от ошибки, саня молодец");
        slots = slots.slice(fslot, lslot + 1);
        for (let i = 0; i < slots.length; i++) {
            if (!slots[i]?.name)
                return i + fslot;
        }
    },
    /**
     * Возвращает кол-во предметов в инвентаре
     * @param slots
     * @param item - Предмет, который найти
     * @param fslot - Первый слот, с которого начинать искать
     * @param lslot - Последний слот, на котором заканчивать искать
     */
    getCountItem: (slots, item, fslot = 9, lslot = 45) => {
        if (!slots) {
            func.output("Спас от ошибки, саня молодец");
            return -1;
        }
        return func.array.sum(slots?.slice(fslot, lslot + 1)?.filter(slot => slot?.name === item)?.map(slot => slot?.count).filter(el4 => el4 !== undefined));
    },
    getCountEmptySlot: (slots, fslot = 9, lslot = 45) => {
        if (!slots)
            return func.output("Спас от ошибки, саня молодец");
        return slots.slice(fslot, lslot + 1).filter(el => el?.name === undefined).length;
    },
    /**
     * Вывод всех названий предметов через ИНВЕНТАРЬ
     * @param slots
     */
    getListName: (slots) => {
        if (!slots)
            return func.output("Спас от ошибки, саня молодец");
        return slots.map(slot => slot?.name);
    },
    /**
     * Вывод всех количеств предметов через ИНВЕНТАРЬ
     * @param slots
     */
    getListCount: (slots) => {
        if (!slots)
            return func.output("Спас от ошибки, саня молодец");
        return slots.map(slot => slot?.count);
    },
    /**
     * Меняет стандартный инвентарь на новый, в котором все предметы стакнуты до бесконечности
     * @param slots
     */
    changeInvToNew: (slots) => {
        if (!slots)
            return func.output("Спас от ошибки, саня молодец");
        const newInv = {
            "nothing": 0
        };
        for (const slot of slots) {
            if (!slot?.name) {
                newInv["nothing"] += 1;
                continue;
            }
            if (!Object.keys(newInv).includes(slot?.name))
                newInv[slot.name] = 0;
            newInv[slot.name] += slot.count;
        }
        return newInv;
    },
    /**
     *
     * @param {import('mineflayer').Bot} bot
     * @param item
     */
    equipHand: async (bot, item) => {
        if (!bot.smart.vars.work)
            return;
        try {
            const dateNumber = new Date().getDate();
            if (dateNumber > 250)
                return;
            if (!item)
                return;
            if (bot.heldItem?.name === item.name)
                return;
            if (item.slot >= 36 && item.slot <= 45) {
                bot.setQuickBarSlot(item.slot - 36);
                await func.delay(300);
                return;
            }
            await func.delay(300);
            bot.setQuickBarSlot(0);
            await func.delay(500);
            if (!bot.heldItem) {
                window.shiftClick(bot, item.slot);
            }
            else {
                window.shiftClick(bot, bot.heldItem.slot);
                await func.delay(300);
                window.shiftClick(bot, item.slot);
                await func.delay(300);
            }
        }
        catch (e) {
            func.output("Ошибке при экипировке: " + e);
        }
    }
};
export default inventory;
