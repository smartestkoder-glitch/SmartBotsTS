import func from './function.js'
import event from './event.js'
import smartOutput from './FuntimeUtils/smartOutput.js'
import restartAnarchy from './FuntimeUtils/restartAnarchy.js'
import connect from './connect.js'
import threeDig from "../Scripts/AutoThree/OneThreeSmartBot/threeDig.js";
import autoListva from "../Scripts/AutoThree/OneThreeSmartBot/autoListva.js";
import boneMeal from "../Scripts/AutoThree/OneThreeSmartBot/boneMeal.js";
import placeSeedling from "../Scripts/AutoThree/OneThreeSmartBot/placeSeedling.js";
import autoInvisible from "./FuntimeUtils/autoInvisible.js";
import restart from "./FuntimeUtils/restart.js"
import repairS from "../Scripts/AutoThree/OneThreeSmartBot/repairСS.js";
import autoRepaitAnvil from "../Scripts/AutoRepair/anvilBot.js";
import repairCS from "../Scripts/AutoThree/OneThreeSmartBot/repairСS.js";
import autoLeave from "./FuntimeUtils/autoLeave.js";
import autoClanInvest from "./FuntimeUtils/autoClanInvest.js";
import autoEat from "./FuntimeUtils/autoEat.js";
import autoDM from "../Scripts/autoDM/autoDM.js";
import autoJump from "./FuntimeUtils/autoJump.js";
import sellAuto from "../Scripts/AutoSell/sell.js";
import moneyFT from "./FuntimeUtils/moneyFT.js";
import detectDonate from "./FuntimeUtils/detectDonate.js";
import autoAuth from "./FuntimeUtils/autoAuth.js";
import {Bot} from "mineflayer";





const startEvent = {
    /**
     *
     * @param {import('mineflayer').Bot} bot
     * @param mode
     * @returns {Promise<void>}
     */
    threeEvent: async (bot :Bot, mode :string) => {
        smartOutput.clanMoneyAndDeath(bot)
        event.end(bot, async (msg :string) => {
            await restart.default(bot, msg)
        })

        if (mode === "Дерево") {
            const an = bot.smart?.vars?.settings?.anarchy
            if (an) bot.chat(an)

            bot.once("spawn", async () => {
                moneyFT.moneyUpdateEvent(bot)
                autoLeave.autoLeave(bot)
                while (bot.smart.vars.work) {
                    await restartAnarchy.restartIfHub(bot)

                    await autoInvisible.drinkIfTime(bot, 31)
                    await autoEat.checkFoodAndEat(bot, 15)
                    await placeSeedling.placeSeedingFull(bot)
                    await threeDig.digThree(bot)
                    await repairCS.swapToolCS(bot, "diamond_axe")
                    await autoClanInvest.investIfHave(bot)
                }
            })

        }
        else if (mode === "Листва") {
            const an = bot.smart?.vars?.settings?.anarchy
            if (an) bot.chat(an)
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
            //await autoDM.autoDMChecker(bot)

        }
    },

    allScripts: async (bot :Bot, mode :string) => {
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

            //await autoDM.autoDMChecker(bot)

        }
    },

    base: (bot :Bot) => {
        moneyFT.moneyUpdateEvent(bot)
        detectDonate.startDetect(bot)
        autoAuth.autoLogin(bot)
        autoAuth.solver(bot)
    }
}

export default startEvent