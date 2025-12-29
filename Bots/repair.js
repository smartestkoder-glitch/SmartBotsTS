import connect from "../Bots utils/connect.js"
import func from "../Bots utils/function.js"
import restartAnarchy from "../Bots utils/Funtime utils/restartAnarchy.js";
import tools from "../Scripts/AutoThree/OneThreeSmartBot/tools.js";
import repairS from "../Scripts/AutoThree/OneThreeSmartBot/repairСS.js";
import autoRepaitAnvil from "../Scripts/AutoRepair/anvilBot.js";
import translator from "../Bots utils/translator.js";

const bot = await connect(
    "FarmerTest_06",
    "mc.funtime.su",
    "/an91",
    "/an21",
    "1.21.4",
    25565,
    "82.26.213.37:5866:ytosonsk:growthup",
    "Починка"
)

/*bot.once("spawn", async () => {
    await restartAnarchy.restartIfHub(bot)
    await autoRepaitAnvil.swapToolsCS(bot)
    func.output("всё")
})*/