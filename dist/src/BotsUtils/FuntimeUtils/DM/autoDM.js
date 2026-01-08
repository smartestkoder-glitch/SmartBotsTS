import func from "../../function.js";
import window from "../../window.js";
import restart from "../../restart.js";
import parseDM from "./parseDM.js";
import dbAutoDMParser from "../../../DataBase/autoDMParser.js";
const autoDM = {
    /**
     *
     * @param {import('mineflayer').Bot} bot
     * @param maxTime
     */
    waitLoadAllSlots: async (bot, maxTime = 1000) => {
        let time = 0;
        const dec = parseDM.decoderText(bot);
        while (dec.data.length !== 45) {
            await func.delay(30);
            time += 30;
            if (time > maxTime) {
                func.output("Превышено время ожидания появления слота!", undefined, "red", "bold");
                return;
            }
        }
    },
    /**
     *
     * @param {import('mineflayer').Bot} bot
     */
    openDM: async (bot) => {
        bot.chat("/dm");
        if (!await window.waitToSlot(bot, 21, "gold_ingot", 10000))
            return restart.default(bot, "Не открылся dm");
        window.click(bot, 21);
        if (!await window.waitToSlot(bot, 49, "nether_star", 10000))
            return restart.default(bot, "Не открылся dm");
    },
    /**
     * Покупает лот на /dm с шедевро пакетом
     * @param {import('mineflayer').Bot} bot
     * @param slot
     */
    buyLot: async (bot, slot) => {
        window.click(bot, slot);
        await func.delay(200);
        autoDM.acceptBuyPacket(bot);
        if (!await window.waitToSlot(bot, 0, "lime_stained_glass_pane", 5000))
            return;
        window.click(bot, 0);
        await window.waitToChangeCountSlot(bot, 5000);
    },
    /**
     * Отправляет шедевро-пакет для подтверждения сделки
     * @param {import('mineflayer').Bot} bot
     */
    acceptBuyPacket: (bot) => {
        bot._client.write("window_click", {
            "windowId": 3, "stateId": 0, "slot": 19, "mouseButton": 0, "mode": 0,
            "changedSlots": [{ "location": 19, "item": { "itemCount": 0 } }], "cursorItem": {
                "itemCount": 1, "itemId": 515, "addedComponentCount": 2, "removedComponentCount": 0,
                "components": [{
                        "type": "custom_name", "data": {
                            "type": "compound", "value": {
                                "extra": {
                                    "type": "list", "value": {
                                        "type": "compound",
                                        "value": [{
                                                "color": { "type": "string", "value": "green" },
                                                "underlined": { "type": "byte", "value": 0 },
                                                "text": { "type": "string", "value": "Подтвердить" },
                                                "strikethrough": { "type": "byte", "value": 0 },
                                                "bold": { "type": "byte", "value": 0 },
                                                "obfuscated": { "type": "byte", "value": 0 },
                                                "italic": { "type": "byte", "value": 0 }
                                            }]
                                    }
                                }, "text": { "type": "string", "value": "" }
                            }
                        }
                    },
                    {
                        "type": "custom_data", "data": {
                            "type": "compound", "value": {
                                "display": {
                                    "type": "compound", "value": {
                                        "Lore": { "type": "list", "value": { "type": "end", "value": [] } },
                                        "Name": {
                                            "type": "string",
                                            "value": "{\"extra\":[{\"bold\":false,\"italic\":false,\"underlined\":false,\"strikethrough\":false,\"obfuscated\":false,\"color\":\"green\",\"text\":\"Подтвердить\"}],\"text\":\"\"}"
                                        }
                                    }
                                }, "VV|Protocol1_20_3To1_20_5": { "type": "byte", "value": 1 }
                            }
                        }
                    }], "removeComponents": []
            }
        });
    },
    /**
     *
     * @param {import('mineflayer').Bot} bot
     * @param buyCourse
     */
    autoDMChecker: async (bot, buyCourse) => {
        await func.delay(500);
        //autoJump.autoJump(bot, 15000, true)
        let parse = {};
        let dm = parseDM.decoderText(bot);
        func.output("Начал чекать...", "", "green", "bold");
        while (bot.currentWindow) {
            dm = parseDM.decoderText(bot);
            if (dm.data.length !== 45) {
                func.output(dm.data.length.toString(), undefined, "red", "bold");
            }
            //console.log(dm)
            const normOffer = dm.data.find(el => el.course >= buyCourse && el.marketPrice <= dm.marketMy);
            if (normOffer) {
                func.output("Пытаюсь купить лот...", "dev", "green", "bold");
                await autoDM.buyLot(bot, normOffer.slot);
            }
            if ((JSON.stringify(dm) !== JSON.stringify(parse)) && dm.data.length === 45) {
                await dbAutoDMParser.createPage(dm.marketMy, dm.data);
            }
            parse = dm;
            window.click(bot, 49);
            await func.delay(100);
            await autoDM.waitLoadAllSlots(bot);
        }
        return restart.default(bot, "Окно закрылось ёпта");
    }
};
export default autoDM;
