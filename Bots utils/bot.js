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

//region ConnectBot

const botL = await connect(
    "FarmerTest_05",
    "mc.funtime.su",
    "/an91",
    "/an21",
    "1.21.1",
    25565,
    "",
    "Листва"
)
const botT = await connect(
    "FarmerTest_04",
    "mc.funtime.su",
    "/an91",
    "/an21",
    "1.21.1",
    25565,
    "",
    "Дерево"
)

//endregion
//const bot = await connect("FarmerTest_03", "localhost","/an318","/an222","1.20.1", 25566, "")

/*bot.once("spawn",  async () => {
    //await repairS.repair(bot, "Топор")
    //bot.chat("/crafts")
    //await func.delay(3000)
    //window.click(bot, 41)
    //await func.delay(3000)
    //console.log(bot.currentWindow?.slots)
    //await repairS.craftEmeraldAxe(bot)
    //console.log(bot.inventory.slots[45].componentMap?.get('enchantments')?.data?.enchantments?.find(el => el?.id === 39))
    //await console.log(tools.findOrigTools(bot.inventory.slots))//.axe.components[1].data.enchantments)
    //await console.log(tools.findEmeraldTools(bot.inventory.slots))//.axe.components[4].data.enchantments)
    //console.log(bot.inventory.slots.find(hoe => hoe?.name === "diamond_hoe"))
})*/


