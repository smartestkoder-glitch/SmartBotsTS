import func from '../../function.js';
import window from '../../window.js';

import restart from "../../restart.js";
import moneyFT from "../moneyFT.js";
import inventory from "../../inventory.js";
import antiAFK from "../antiAFK.js";
import autoSell from "./autoSell.js";
import {Item} from "prismarine-item";
import {Bot} from "mineflayer";

const autoBuy = {

    getLoreJSON: (item :any) => {
        const lore = item?.components?.find((el: { type: string; }) => el?.type === "custom_data")?.data?.value?.display?.value?.Lore?.value?.value?.join(",")
        if (!lore) return []
        return JSON.parse("["+ lore + "]")
    },

    getPrice: (item :Item)=> {
        const data = autoBuy.getLoreJSON(item)
        if (!data) return
        return Number(data?.find((el: { extra: { text: string; }[]; }) => Array.isArray(el?.extra) && el?.extra[0]?.text === "$")?.extra[2]?.text?.replace(/\D/g, ""))
    },

    getDealer: (item :Item) => {
        const data = autoBuy.getLoreJSON(item)

        if (!data) return
        return data.find((el: { extra: string | any[]; }) => Array.isArray(el?.extra) && (el.extra.length > 1) && (el?.extra[1]?.text?.includes("Прoдaвeц")))?.extra[2]?.text?.replaceAll(" ", "")
    },

    getTypePotion: (item :any) => {
        return item?.components?.find((el: { type: string; }) => el?.type === "custom_data")?.data?.value?.Potion?.value
    },

    decodeOneItem: (item :Item) => {
        if (!item) return
        return {
            count: item.count,
            name: item.name,
            dealer: autoBuy.getDealer(item),
            price: autoBuy.getPrice(item),
            potion: autoBuy.getTypePotion(item),
            slot: item.slot
        }
    },

    decodeAll: (bot :Bot) => {
        let result = []

        if (!bot.currentWindow?.slots) return []

        for (const item of bot.currentWindow?.slots) {
            if (!item) continue
            const dec = autoBuy.decodeOneItem(item)
            if (!dec) continue
            if (isNaN(Number(dec.price))) continue
            result.push(dec)
        }
        return result
    },

    openAh: async (bot :Bot, par :string, randLook :boolean = true) => {
        await window.close(bot)
        if (randLook) await antiAFK.randomLook(bot)
        for (let i = 0; i < 3; i++) {
            bot.chat("/ah " + par)
            if (await window.waitToChangeCountSlot(bot, 5000)) {
                await func.delay(1500)
                return
            }
        }
        restart.default(bot, "Не открылся аукцион")
    },

    findNormalOffer: (bot :Bot, normPrice :number, name :string, potion :string) => {
        const decodeAh = autoBuy.decodeAll(bot)
        const money = moneyFT.getMoney(bot)
        if (!money) return

        const normOffer = decodeAh
            .find(item =>
                (item.price)
                && (item.name === name)
                && (item.potion === potion)
                && ((item.price/item.count) < normPrice)
                && (item.price < money))

        return normOffer

    },

    getListNow: (bot :Bot) => {
        const nameWindow = window.getNameWindow(bot)

        return nameWindow?.match(/Поиск: Инв \[\d+\//)?.[0]?.replace(/\D/g, "")
    },

    getListAll: (bot :Bot) => {
        const nameWindow = window.getNameWindow(bot)

        return nameWindow?.match(/\/\d+/)?.[0]?.replace(/\D/g, "")
    },

    buyItem: async (bot :Bot, slot :number) => {
        window.click(bot, slot)
        if (!await window.waitToSlot(bot, 1, "lime_stained_glass_pane", 5000)) return

        window.click(bot, 1)
        await window.waitToChangeCountSlot(bot, 5000)
    },

    goNextPage: async (bot :Bot) => {

        if (autoBuy.checkLastPage(bot)) return

        window.click(bot, 50)
        await window.waitToChangeNameWindow(bot, 5000)
    },

    checkLastPage: (bot :Bot) => {
        if (autoBuy.getListNow(bot) - autoBuy.getListAll(bot) === 0) return true
        return false
    },

    checkAh: (bot :Bot) => {
        if (bot.currentWindow?.slots[49]?.name === "nether_star") return true
        return false
    },

    multiPageAutoBuy: async (bot :Bot, search :string, itemName :string, price :number, potion :string, minBuyCount :number = 1, minNeedCount :number = 1, timeToBuy :number = 1000, timeToNextPage :number = 1000, minMoneyCount :number = 10) => {
        func.output(`Бот начинает покупать`, "dev", "green", "bold")


        if (!bot.smart?.vars?.script?.autoSell?.needToBuy) {
            func.output("Бот хотел купить, но needToBuy говорит что не надо!", "dev", "yellow", "bold")
            return
        }
        if (!bot.currentWindow) await autoBuy.openAh(bot, " search " + search, true)

        if (!autoBuy.checkAh(bot)) {
            func.output("Окно не является аукционом, поэтому болт ничего не купил!", "dev", "yellow", "bold")
            return
        }

        while (!autoBuy.checkLastPage(bot) // Проверяет, что не на последней странице
        && inventory.getCountItem(bot.currentWindow?.slots, itemName, 54, 90) < minNeedCount // Проверяет, выполнил ли цель по покупке предметов
        && (moneyFT.getMoney(bot) || -1) >= (price * minMoneyCount)) { // Проверяет, что достаточно монет для покупки X предметов

            const normOffer = autoBuy.findNormalOffer(bot, price, itemName, potion)

            if (normOffer) {
                await func.delay(timeToBuy)
                await autoBuy.buyItem(bot, normOffer.slot)
                func.output(`Бот попытался купить... Прайс: ${normOffer.price}, Штуки: ${normOffer.count}`, "dev", "green", "bold")

            }
            await func.delay(timeToNextPage)
            await autoBuy.goNextPage(bot)
            func.output(`Бот листает страницу аукциона... Текущая страница - ${autoBuy.getListNow(bot)}`, "dev", "green", "bold")

        }
        autoSell.updateNeedToBuy(bot, false)
        func.output(`Бот закончил покупать! Состояния: ${!autoBuy.checkLastPage(bot)} -=-
         ${inventory.getCountItem(bot.currentWindow?.slots, itemName, 54, 90) < minNeedCount} -=- 
         ${(moneyFT.getMoney(bot) || -1) >= (price * minMoneyCount)}`, "dev", "green", "bold")
    }
}
export default  autoBuy