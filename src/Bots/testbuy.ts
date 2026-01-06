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

//setInterval(() => {console.log(process.memoryUsage())}, 60000)

const bot = await connect(
    "VsosalMomentomWW",
    "mc.funtime.su",
    25565,
    {
        anarchy: "/an310",
        version: "1.21.4",
        proxy: "45.43.70.207:6494:xyhqvwvm:growthup",//104.252.62.195:5566:uyefiwor:growthup
    }
)



translator.chat(bot, true)
bot.once("spawn", async () => {

    await restartAnarchy.restartIfHub(bot)
    await func.delay(1000)
    await autoDM.openDM(bot)
    func.output("Делаю грязь...", undefined, "green", "bold")
    //await autoBuy.openAh(bot, "search Инв")
    while (true) {
        const decode = parseDM.decoder(bot)?.data
        if (decode.length === 44) func.output("ШЛЮХИ", undefined, "red", "bold")
        func.output(decode.find(el => el.course > 650000), undefined, "yellow", "bold")
        const sl = decode.find(el => el.course > 650000)
        if (sl) {
            func.output("Хоть бы словил...", undefined, "green", "bold")
            console.log(sl.slot)
            window.click(bot, sl.slot)
            await func.delay(200)
            bot._client.write("window_click", {"windowId":3,"stateId":0,"slot":19,"mouseButton":0,"mode":0,"changedSlots":[{"location":19,"item":{"itemCount":0}}],"cursorItem":{"itemCount":1,"itemId":515,"addedComponentCount":2,"removedComponentCount":0,"components":[{"type":"custom_name","data":{"type":"compound","value":{"extra":{"type":"list","value":{"type":"compound","value":[{"color":{"type":"string","value":"green"},"underlined":{"type":"byte","value":0},"text":{"type":"string","value":"Подтвердить"},"strikethrough":{"type":"byte","value":0},"bold":{"type":"byte","value":0},"obfuscated":{"type":"byte","value":0},"italic":{"type":"byte","value":0}}]}},"text":{"type":"string","value":""}}}},{"type":"custom_data","data":{"type":"compound","value":{"display":{"type":"compound","value":{"Lore":{"type":"list","value":{"type":"end","value":[]}},"Name":{"type":"string","value":"{\"extra\":[{\"bold\":false,\"italic\":false,\"underlined\":false,\"strikethrough\":false,\"obfuscated\":false,\"color\":\"green\",\"text\":\"Подтвердить\"}],\"text\":\"\"}"}}},"VV|Protocol1_20_3To1_20_5":{"type":"byte","value":1}}}}],"removeComponents":[]}})
            await window.waitToChangeCountSlot(bot, 5000)
            window.click(bot, 0)
            await window.waitToChangeCountSlot(bot, 5000)

            //
        }
        window.click(bot, 49)
        await func.delay(100)


    }
    //await rubbish.all(bot, true, ["potion"])
    //console.log(await autoBuy.multiPageAutoBuy(bot, "potion", 10000, "minecraft:long_invisibility", 1, 17, 1000, 1000, 1))

    bot.end("Думетх легенда <3")
})

bot.on("end", (reason) => {
    console.log(reason)
})





