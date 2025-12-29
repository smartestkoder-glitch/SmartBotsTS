import item from "../../Bots utils/item.js"
import func from "../../Bots utils/function.js"
import inventory from "../../Bots utils/inventory.js"
import window from "../../Bots utils/window.js";


const repairAxe = {
    /**
     * Проверить, что прочность на незеритовом топоре выше определенного процента
     * @param bot
     * @param minPercent
     * @returns {boolean}
     */
    axeCheckDur: (bot, minPercent) => {
        const netheriteAxe = inventory.getSlotItem(bot.inventory.slots,"netherite_axe")
        if (netheriteAxe) {

            return item.getDurability.percent(netheriteAxe) >= minPercent
        }
        else {
            func.output("Топор отсутствует в инвентаре!", "ПРОВЕРКА-ПРОЧНОСТИ")
            return false
        }
    },


    /**
     * Функция для находления опыта в окне/инвентаре
     * @param bot
     */
    findExp: (bot) => {
        return inventory.getSlotItem(bot.inventory.slots,"experience_bottle")
    },

    /**
     * Функция для использования 1 стака опыта
     * @param {import('mineflayer').Bot} bot
     */
    useSlotExp: async (bot) => {
        while (bot.heldItem?.name === "experience_bottle") {
            bot.activateItem()
            await func.delay(10)
        }
    },


    /**
     * Функция для починки топора на 1 стак опыта
     * @param {import('mineflayer').Bot} bot
     * @returns {Promise<void>}
     */
    repairOneStack: async (bot) => {
        //Ищем топор в инвентаре
        const axe = inventory.getSlotItem(bot.inventory.slots,"netherite_axe")
        if (!axe) return func.output("Топор не найден в инвентаре!", "ОШИБКА")

        //Берем топор в левую руку
        await window.swapItem(bot, axe.slot, 45)

        //Открытие /clan storage
        bot.chat("/clan storage")
        await window.waitToChangeCountSlot(bot)

        //Ищем опыт
        const exp = inventory.getSlotItem(bot.currentWindow.slots,"experience_bottle", 0, 89)

        //Свапаем с активной рукой
        await window.swapItem(bot, exp.slot, bot.quickBarSlot+81)

        //Закрываем окно
        bot.closeWindow(bot.currentWindow)

        //Используем опыт, пока не закончится
        await repairAxe.useSlotExp(bot)
        await func.delay(500)
        //Возвращаем топор в место, где он и был
        await window.swapItem(bot, 45, 36)//1 хотбар
        await func.delay(500)

    },


    /**
     * Функция для починки топора до определенного процента
     * @param {import('mineflayer').Bot} bot
     * @param percent
     * @returns {Promise<void>}
     */
    repairToPercent: async (bot, percent = 50) => {
        let axe = inventory.getSlotItem(bot.inventory.slots,"netherite_axe")
        while (item.getDurability.percent(axe) < percent) {

            await repairAxe.repairOneStack(bot)
            await func.delay(1000)
            axe = inventory.getSlotItem(bot.inventory.slots,"netherite_axe")

        }
    }

}


export default repairAxe;