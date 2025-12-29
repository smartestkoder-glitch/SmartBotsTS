import func from './function.js'
import event from './event.js'
import smartOutput from './Funtime utils/smartOutput.js'
import restartAnarchy from './Funtime utils/restartAnarchy.js'
import connect from './connect.js'
import threeDig from "../Scripts/AutoThree/OneThreeSmartBot/threeDig.js";
import autoListva from "../Scripts/AutoThree/OneThreeSmartBot/autoListva.js";
import boneMeal from "../Scripts/AutoThree/OneThreeSmartBot/boneMeal.js";
import placeSeedling from "../Scripts/AutoThree/OneThreeSmartBot/placeSeedling.js";
import autoInvisible from "./Funtime utils/autoInvisible.js";
import restart from "../Bots utils/Funtime utils/restart.js"
import repairS from "../Scripts/AutoThree/OneThreeSmartBot/repairСS.js";
import autoRepaitAnvil from "../Scripts/AutoRepair/anvilBot.js";
import repairCS from "../Scripts/AutoThree/OneThreeSmartBot/repairСS.js";
import autoLeave from "./Funtime utils/autoLeave.js";
import autoClanInvest from "./Funtime utils/autoClanInvest.js";
import autoEat from "./Funtime utils/autoEat.js";
import autoDM from "../Scripts/autoDM/autoDM.js";
import autoJump from "./Funtime utils/autoJump.js";
import sellAuto from "../Scripts/AutoSell/sell.js";





const startEvent = {
    /**
     *
     * @param {import('mineflayer').Bot} bot
     * @param mode
     * @returns {Promise<void>}
     */
    threeEvent: async (bot, mode) => {
        smartOutput.clanMoneyAndDeath(bot)
        event.end(bot, async (msg) => {
            await restart.default(bot, msg)
        })

        if (mode === "Дерево") {
            bot.chat(bot.smart.vars.settings.anarchy)

            bot.once("spawn", async () => {
                autoClanInvest.moneyUpdateEvent(bot)
                autoLeave.autoLeave(bot)
                while (bot.smart.vars.work) {
                    await restartAnarchy.restartIfHub(bot)

                    await autoInvisible.drinkIfTime(bot, 31)
                    await autoEat.checkFoodAndEat(bot, 15)
                    await placeSeedling.placeSeedingFull(bot)
                    await threeDig.digThree(bot)
                    await repairCS.swapToolCS(bot, "diamond_axe")
                    await autoClanInvest.investIfHave(bot, 5000000)
                }
            })

        }
        else if (mode === "Листва") {
            bot.chat(bot.smart.vars.settings.anarchy)
            bot.once("spawn", async () => {
                autoLeave.autoLeave(bot)
                while (bot.smart.vars.work) {
                    await restartAnarchy.restartIfHub(bot)
                    await autoInvisible.drinkIfTime(bot, 31)
                    await autoEat.checkFoodAndEat(bot, 15)
                    await autoListva.breakListva(bot)
                    await repairCS.swapToolCS(bot, "diamond_hoe")

                }
            })
        }
        else if (mode === "Починка") {
            while (bot.smart.vars.work) {
                await restartAnarchy.restartIfHub(bot)
                await autoRepaitAnvil.repairTool(bot)
                await func.delay(5000)
            }

        }
        else if (mode === "ПарсерБиржи") {
            await restartAnarchy.restartIfHub(bot)
            await autoDM.openDM(bot)
            await autoDM.autoDM(bot)
        }
    },

    allScripts: async (bot, mode) => {
        if (mode === "autoSell") {
            smartOutput.clanMoneyAndDeath(bot)
            event.end(bot, async (msg) => {
                await restart.default(bot, msg)
            })
            await restartAnarchy.restartIfHub(bot)
            await func.delay(10000)
            while (bot.smart.vars.work) {
                await sellAuto.collectLastItem(bot, 2)
                await sellAuto.sell(bot, "potion", 50000)
            }
        }
        if (mode === "autoDMChecker") {

            await restartAnarchy.restartIfHub(bot)
            await func.delay(2000)
            autoJump.autoJump(bot, 60000, true)
            await autoDM.openDM(bot)

            await autoDM.autoDMChecker(bot)

        }
    }
}

export default startEvent