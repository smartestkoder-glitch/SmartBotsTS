import moneyFT from "./FuntimeUtils/moneyFT.js";
import detectDonate from "./FuntimeUtils/detectDonate.js";
import autoAuth from "./FuntimeUtils/autoAuth.js";
import restartAnarchy from "./FuntimeUtils/restartAnarchy.js";
import func from "./function.js";
import autoJump from "./FuntimeUtils/autoJump.js";
import autoDM from "./FuntimeUtils/DM/autoDM.js";
import saveEvents from "./saveEvents.js";
import restart from "./restart.js";
const startEvent = {
    /**
     *
     * @param {import('mineflayer').Bot} bot
     * @param mode
     */
    allScripts: async (bot, mode) => {
        /*if (mode === "autoSell") {
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
        }*/
        if (mode === "autoDM") {
            //if(bot.smart.vars.default?.autoJump !== undefined) bot.smart.vars.default.autoJump = true
            if (bot.smart.vars.money?.autoClan !== undefined)
                bot.smart.vars.money.autoClan = true;
            await restartAnarchy.restartIfHub(bot);
            await func.delay(2000);
            autoJump.autoJump(bot, 60000, true);
            //setInterval(antiAFK.randomLook, 60000, bot)
            await autoDM.openDM(bot);
            await autoDM.autoDMChecker(bot, 2000000);
        }
    },
    savesEvent: (bot) => {
        saveEvents.kick(bot);
        saveEvents.death(bot);
        saveEvents.chat(bot);
    },
    base: (bot) => {
        moneyFT.moneyUpdateEvent(bot);
        detectDonate.startDetect(bot);
        autoAuth.autoLogin(bot);
        autoAuth.solver(bot);
        bot.on("end", async () => {
            await func.delay(1000);
            restart.restartBot(bot);
        });
    }
};
export default startEvent;
