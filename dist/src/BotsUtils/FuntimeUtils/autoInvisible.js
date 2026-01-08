import inventory from "../inventory.js";
import effect from "../effects.js";
import item from '../item.js';
import func from "../function.js";
import use from "../use.js";
import restart from "../restart.js";
const autoInvisible = {
    checkEffect: (bot) => {
        if (!bot.smart.vars.work)
            return;
        const effInvis = effect.findEffect(bot, "Невидимость");
        if (effInvis && effInvis.level === 2) {
            restart.default(bot, "Принудительный перезаход!");
            return;
        }
        return effInvis;
    },
    findPotionInvisible: (bot) => {
        if (!bot.smart.vars.work)
            return;
        const potion = inventory.getAllSlotsItem(bot.inventory.slots, "potion", 9, 44);
        if (!potion)
            return;
        return potion?.find(pot => item.getEffectFromPotion(pot)?.find(eff => eff?.name?.includes("invisibility"))) || potion.find(el => el?.name);
    },
    /**
     * Найти и выпить инвиз
     * @param {import('mineflayer').Bot} bot
     */
    transferAndDrinkInvis: async (bot) => {
        if (!bot.smart.vars.work)
            return;
        await func.delay(300);
        const countInvis = inventory.getCountItem(bot.inventory.slots, "potion");
        if (countInvis < 10 && countInvis !== 0)
            func.output("Инвиз почти закончился! Осталось: " + countInvis + "шт", undefined, "red", "bold");
        const invisSlot = autoInvisible.findPotionInvisible(bot);
        if (invisSlot) {
            await inventory.equipHand(bot, invisSlot);
            await func.delay(200);
            await use.time(bot, 2300);
            await func.delay(200);
            //func.output(`Выпил инвизочку(наверно) :). На боте инвиз на: ${effect.findEffect(bot, "Невидимость")?.duration} секундочек`, "АВТО-ИНВИЗ")
        }
        else {
            //func.output("Инвиза нет в инвентаре!", "АВТО-ИНВИЗ")
        }
    },
    drinkIfTime: async (bot, time) => {
        await func.delay(100);
        const effect = autoInvisible.checkEffect(bot);
        if (!effect?.duration || effect.duration < time)
            return await autoInvisible.transferAndDrinkInvis(bot);
    }
};
export default autoInvisible;
