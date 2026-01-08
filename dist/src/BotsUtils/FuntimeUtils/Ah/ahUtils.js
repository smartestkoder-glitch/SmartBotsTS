import detectDonate from "../detectDonate.js";
import window from "../../window.js";
import restart from "../../restart.js";
import inventory from "../../inventory.js";
const ahUtils = {
    getBoughtCountItem: (bot, newVersion = false) => {
        if (!bot.currentWindow)
            return restart.default(bot, "Окно не открыто чтобы узнать сколько предметов продается!");
        if (!window.getNameWindow(bot).includes("Хранилище"))
            return restart.default(bot, "Открыто не то окно чтобы узнать сколько предметов продается!");
        const donate = detectDonate.get(bot);
        let maxSlots;
        if (newVersion)
            maxSlots = detectDonate.slots.newVersion[donate];
        else
            maxSlots = detectDonate.slots.oldVersion[donate];
        const emptySlot = inventory.getCountEmptySlot(bot.currentWindow.slots, 0, maxSlots - 1);
        return emptySlot;
    },
};
export default ahUtils;
