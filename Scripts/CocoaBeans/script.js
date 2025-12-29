import move from "../../Bots utils/move.js"
import func from "../../Bots utils/function.js"
import clickerCB from "./clicker.js"
import translator from "../../Bots utils/translator.js";
import window from "../../Bots utils/window.js"
import inventory from "../../Bots utils/inventory.js";
import repairAxe from "./repairAxe.js";
import buyer from "../../Bots utils/Funtime utils/buyer.js";
import event from "../../Bots utils/event.js";
import connect from "../../Bots utils/connect.js";


import autoInvisible from "../../Bots utils/Funtime utils/autoInvisible.js";
import autoEat from "../../Bots utils/Funtime utils/autoEat.js";
import smartOutput from "../../Bots utils/Funtime utils/smartOutput.js";

const scriptCB = {

    start: async (bot) => {
        event.spawnOnce(bot, async () => {
            clickerCB.clickerEvent(bot)
            scriptCB.startEvent(bot)

            while (true) {

                for (let i = 0; i < 4; i++) {
                    await scriptCB.beforeFirstLine(bot).catch(err => {})
                    await autoInvisible.transferAndDrinkInvis(bot).catch(err => {})
                    await autoEat.checkFoodAndEat(bot, 10).catch(err => {})

                    await func.delay(500)
                    for (let i = 0; i < 5; i++) {

                        await scriptCB.newVersion.defaultLine(bot).catch(err => {})
                        await scriptCB.newVersion.goToNextLine(bot).catch(err => {})
                        await buyer.sell(bot, 13, "cactus", 10, "cocoa_beans").catch(err => {})
                    }
                }

            }

        })
    },

    startEvent: async (bot) => {
        translator.death(bot, "СУКА МЕНЯ ЗАГАСИЛИ УЁБКИ")
        translator.end(bot, "БЛЯЯЯЯ Я ОФНУЛСЯ!")
        translator.kick(bot, "ЕБУЧИЙ СЛУЧАЙ! МЕНЯ СЕРВЕР КИКНУЛ!")
        translator.spawn(bot, "Йа зяспявнилься! ураааа")
        smartOutput.clanMoneyAndDeath(bot)
    },

    /**
     * Действия, которые будут выполняться перед началом нового круга бота. Действия:
     * 1. Телепортация на клан хом
     * 2. Направление взгляда в нужную точку
     * 3. Экипировка топора
     * 4. Починка топора
     * @param {import('mineflayer').Bot} bot
     * @returns {Promise<void>}
     */
    beforeFirstLine: async (bot) => {
        if (bot._client?.socket?.destroyed) {
            bot.quit()

            await func.delay(5000)
            await connect(bot.vars.settings.username, bot.smart.vars.settings.server, bot.smart.vars.settings.anarchy, bot.smart.vars.settings.version, bot.smart.vars.settings.port, bot.smart.vars.settings.proxy)
            await func.delay(10000)
            scriptCB.startEvent(bot)

        }

        bot.chat(bot.smart.vars.settings.anarchy)
        await func.delay(3000)

        //Телепортация в начало фермы
        bot.chat("/home 1")
        await func.delay(bot.smart.vars.settings.cdms + 500)

        //Направление взгляда
        //await bot.look(Math.PI*3/2+0.005, Math.PI/2, true)
        //await func.delay(500)

        //Экипировка топора
        await window.swapItem(bot, inventory.getSlotItem(bot.inventory.slots, "netherite_axe")?.slot, 36)

        //Починка топора (если на нем менее 50% прочности)
        await repairAxe.repairToPercent(bot, 50)
        bot.chat("/clan invest 10000000")
    },



    /**
     * Действия бота для прохождения 1 линии какао бобов
     * @param {import('mineflayer').Bot} bot
     * @returns {Promise<void>}
     */
    line: async (bot) => {

        //Бот идет вперед и ломает какао бобы
        bot.setQuickBarSlot(0)
        await func.delay(500)
        clickerCB.dig.start(bot)
        await func.delay(500) //Ожидание, чтобы начать кликер
        move.just.forward.start(bot)
        await func.delay(9700)
        move.just.forward.stop(bot)
        clickerCB.dig.stop(bot)

        await func.delay(500) //Ожидание, чтобы завершить кликер

        //Бот идет обратно и ставит какао бобы
        clickerCB.place.start(bot)
        move.just.back.start(bot)
        await scriptCB.changeHotbarSlot(bot)
        move.just.back.stop(bot)
        clickerCB.place.stop(bot)


        //Переход к следующему ряду
        await move.just.left.start(bot)
        await func.delay(750)
        await move.just.left.stop(bot)

        await func.delay(100)

        await move.just.forward.start(bot)
        await func.delay(250)
        await move.just.forward.stop(bot)

        await func.delay(100)

        await move.just.right.start(bot)
        await func.delay(300)
        await move.just.right.stop(bot)

        await func.delay(100)


        //Продажа баеру
        await buyer.sell(bot, 13, "cactus", 10, "cocoa_beans")
    },




    /**
     * Проход линии при отходе влево
     * @param bot
     * @returns {Promise<void>}
     */
    lineNew1: async (bot) => {

        //Бот идет вперед и ломает какао бобы
        bot.setQuickBarSlot(0)
        await func.delay(500)
        clickerCB.dig.start(bot)
        await func.delay(500) //Ожидание, чтобы начать кликер
        move.just.forward.start(bot)
        await func.delay(9700)
        move.just.forward.stop(bot)
        clickerCB.dig.stop(bot)

        move.just.left.start(bot)
        await func.delay(500)
        move.just.left.stop(bot)

        await func.delay(500)
        clickerCB.dig.start(bot)
        await func.delay(500) //Ожидание, чтобы начать кликер
        move.just.back.start(bot)
        await func.delay(9700)
        move.just.back.stop(bot)
        clickerCB.dig.stop(bot)


        await func.delay(500) //Ожидание, чтобы завершить кликер
        move.just.right.start(bot)
        await func.delay(500)
        move.just.right.stop(bot)


        //Бот идет обратно и ставит какао бобы
        clickerCB.place.start(bot)
        move.just.forward.start(bot)
        await scriptCB.changeHotbarSlot(bot)
        move.just.forward.stop(bot)
        clickerCB.place.stop(bot)


        //Переход к следующему ряду
        await move.just.left.start(bot)
        await func.delay(750)
        await move.just.left.stop(bot)

        await func.delay(100)

        await move.just.forward.start(bot)
        await func.delay(250)
        await move.just.forward.stop(bot)

        await func.delay(100)

        await move.just.right.start(bot)
        await func.delay(300)
        await move.just.right.stop(bot)

        await func.delay(100)


        //Продажа баеру
        await buyer.sell(bot, 13, "cactus", 10, "cocoa_beans")
    },

    /**
     * Функция для переключения слотов при расстановке
     * @param {import('mineflayer').Bot} bot
     * @returns {Promise<void>}
     */
    changeHotbarSlot: async (bot) => {
        //Ну тут думаю и так всё понятно...
        bot.setQuickBarSlot(1)
        await func.delay(2000)

        bot.setQuickBarSlot(2)
        await func.delay(2000)

        bot.setQuickBarSlot(3)
        await func.delay(2000)

        bot.setQuickBarSlot(4)
        await func.delay(2000)

        bot.setQuickBarSlot(5)
        await func.delay(1700)

    },

    newVersion: {

        changeHotbarSlotFirst: async (bot) => {
            //Ну тут думаю и так всё понятно...
            bot.setQuickBarSlot(1)
            await func.delay(4000)

            bot.setQuickBarSlot(2)
            await func.delay(4000)

            bot.setQuickBarSlot(3)
            await func.delay(2000)



        },

        changeHotbarSlotSecond: async (bot) => {
            //Ну тут думаю и так всё понятно...
            bot.setQuickBarSlot(3)
            await func.delay(2000)

            bot.setQuickBarSlot(4)
            await func.delay(4000)

            bot.setQuickBarSlot(5)
            await func.delay(4000)



        },


        digForward: async (bot) => {
            bot.setQuickBarSlot(0)
            clickerCB.dig.start(bot)
            move.just.forward.start(bot)
            await func.delay(9700)
            move.just.forward.stop(bot)
            clickerCB.dig.stop(bot)
        },

        digBack: async (bot) => {
            clickerCB.dig.start(bot)
            move.just.back.start(bot)
            await func.delay(9700)
            move.just.back.stop(bot)
            clickerCB.dig.stop(bot)
        },

        placeForward: async (bot) => {
            clickerCB.place.start(bot)
            move.just.forward.start(bot)
            await scriptCB.newVersion.changeHotbarSlotFirst(bot)
            move.just.forward.stop(bot)
            clickerCB.place.stop(bot)
        },

        placeBack: async (bot) => {
            clickerCB.place.start(bot)
            move.just.back.start(bot)
            await scriptCB.newVersion.changeHotbarSlotFirst(bot)
            move.just.back.stop(bot)
            clickerCB.place.stop(bot)
        },


        miniLine: async (bot) => {
            await scriptCB.newVersion.digForward(bot)
            await scriptCB.newVersion.placeBack(bot)
        },

        defaultLine: async (bot) => {
            await scriptCB.newVersion.miniLine(bot)

            move.just.left.start(bot)
            await func.delay(250)
            move.just.left.stop(bot)

            await scriptCB.newVersion.miniLine(bot)

        },

        goToNextLine: async (bot) => {
            move.just.left.start(bot)
            await func.delay(600)
            move.just.left.stop(bot)

            move.just.forward.start(bot)
            await func.delay(300)
            move.just.forward.stop(bot)

            move.just.right.start(bot)
            await func.delay(500)
            move.just.right.stop(bot)
        }
    }



}

export default scriptCB




























