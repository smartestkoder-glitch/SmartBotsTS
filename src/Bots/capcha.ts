import connect from "../../Bots utils/connect.js"
import func from "../../Bots utils/function.js"
import restartAnarchy from "../../Bots utils/Funtime utils/restartAnarchy.js";
import tools from "../../Scripts/AutoThree/OneThreeSmartBot/tools.js";
import repairS from "../../Scripts/AutoThree/OneThreeSmartBot/repairСS.js";
import autoRepaitAnvil from "../../Scripts/AutoRepair/anvilBot.js";
import item from "../../Bots utils/item.js";
import effect from "../../Bots utils/effects.js";
import autoInvisible from "../../Bots utils/Funtime utils/autoInvisible.js";
import inventory from "../../Bots utils/inventory.js";
import Vec3 from "vec3"
import autoLeave from "../../Bots utils/Funtime utils/autoLeave.js";
import autoEat from "../../Bots utils/Funtime utils/autoEat.js";
import window from "../../Bots utils/window.js";
import translator from "../../Bots utils/translator.js";
import move from "../../Bots utils/move.js";
import autoJump from "../../Bots utils/Funtime utils/autoJump.js";
import autoClanInvest from "../../Bots utils/Funtime utils/autoClanInvest.js";
import smartOutput from "../../Bots utils/Funtime utils/smartOutput.js";
import sellAuto from "../../Scripts/AutoSell/sell.js";
import sell from "../../Scripts/AutoSell/sell.js";
import digBlock from "../../Bots utils/digBlock.js";
import placeBlock from "../../Bots utils/placeBlock.js";
import digNW from "../../Scripts/NetherWart/dig.js";
import restackNW from "../../Scripts/NetherWart/restack.js";
import scriptNW from "../../Scripts/NetherWart/script.js";
import placeNW from "../../Scripts/NetherWart/place.js";
import parseDM from "../../Scripts/autoDM/parseDM.js";
import autoDM from "../../Scripts/autoDM/autoDM.js";
import autoDMDatabaseFunc from "../../Scripts/autoDM/database.js";
import detectDonate from "../../Bots utils/Funtime utils/detectDonate.js";
import autoBuy from "../../Bots utils/Funtime utils/Ah/autoBuy.js";
import antiAFK from "../../Bots utils/Funtime utils/antiAFK.js";
import rubbish from "../../Bots utils/rubbish.js";
import autoSell from "../../Bots utils/Funtime utils/Ah/autoSell.js";

import FlayerCaptcha from "flayercaptcha"
import sharp from "sharp"
import autoAuth from "../../Bots utils/Funtime utils/autoAuth.js";
//setInterval(() => {console.log(process.memoryUsage())}, 60000)

const bot = await connect(
    "FeeeveeerOPL5",
    "mc.funtime.su",
    25565,
    "Sasha23110",
    {
        anarchy: "/an310",
        version: "1.21.4",
        //proxy: "45.43.70.207:6494:xyhqvwvm:growthup",//104.252.62.195:5566:uyefiwor:growthup
    }
)

autoAuth.saveCaptcha(bot)
autoAuth.solver(bot)
autoAuth.autoLogin(bot)
translator.chat(bot, true)
bot.once("spawn", async () => {



})

bot.on("kicked", (reason) => {
    func.outputObject(reason)
})

bot.on("end", (reason) => {
    console.log(reason)
})





