import connect from "./connect.js";
import item from "./item.js";
import func from './function.js';
import window from './window.js';
import inventory from "./inventory.js";
import transltor from './translator.js'
import event from "./event.js";
import effect from "./effects.js";
import use from "./use.js"
import digBlock from "./digBlock.js"
import attack from "./attack.js";
import startEvent from "./startEvent.js";


import buyer from "./Funtime utils/buyer.js";
import autoInvisible from "./Funtime utils/autoInvisible.js";
import teleport from "./Funtime utils/teleport.js";

import effects from "./effects.js";

import scriptCB from "../Scripts/CocoaBeans/script.js";
import repairAxe from "../Scripts/CocoaBeans/repairAxe.js";


import savedInventory from "../Bots settings/saved inventory.js";

import util from 'util'
import clickerCB from "../Scripts/CocoaBeans/clicker.js";
import placeBlock from "./placeBlock.js";

import placeSeedling from "../Scripts/AutoThree/OneThreeSmartBot/placeSeedling.js";
import threeBoneMeal from "../Scripts/AutoThree/OneThreeSmartBot/boneMeal.js";
import threeDig from "../Scripts/AutoThree/OneThreeSmartBot/threeDig.js";
import autoListva from "../Scripts/AutoThree/OneThreeSmartBot/autoListva.js";
import repairS from "../Scripts/AutoThree/OneThreeSmartBot/repairСS.js";
import threeRubbish from "../Scripts/AutoThree/OneThreeSmartBot/rubbish.js";

import farmerExp from "../Scripts/AutoRepair/farmerExp.js";

import Vec3 from "vec3"
import boneMeal from "../Scripts/AutoThree/OneThreeSmartBot/boneMeal.js";
import three from "../Scripts/AutoThree/OneThreeSmartBot/boneMeal.js";
import threeTools from "../Scripts/AutoThree/OneThreeSmartBot/tools.js";
import tools from "../Scripts/AutoThree/OneThreeSmartBot/tools.js";
import restart from "./Funtime utils/restart.js";
import restartAnarchy from "./Funtime utils/restartAnarchy.js";
import autoRepaitAnvil from "../Scripts/AutoRepair/anvilBot.js";

const bot = await connect(
    "FarmerTest_04",
    "mc.funtime.su",
    "/an21",
    "/an21",
    "1.21.1",
    25565,
    "",
    ""
)
transltor.chat(bot, true)
bot.once("spawn", async () => {
    await restartAnarchy.restartIfHub(bot)
    while (true) {
        await repairS.swapToolCS(bot, "diamond_axe")
    }
})