import item from "../../item.js";
const parseDM = {
    /*decoder: (bot :Bot) => {
        const perse = bot.currentWindow?.slots.map((el: { components: any[] }) => el?.components?.find(el => el?.type === "lore")?.data?.map(el => el?.value?.extra?.value?.value?.map(el => el?.text?.value))).filter(data => data?.length > 8).map(el => el.filter(str => str.length > 2))
        const names = bot.currentWindow?.slots?.map((el: { components: any[] }) => el?.components?.find(el1 => el1?.type === "custom_name")?.data?.value?.extra?.value?.value[1]?.text?.value?.trim()).filter(el4 => el4)

        let marketMy

        const smart = []

        for (let i = 0; i < perse.length; i++) {
            smart.push({
                "dealer": perse[i].find((el: string[]) => el[1] === "Дилер:")[2],
                "price": Number(perse[i].find((el: string[]) => el[1] === "Монет:")[2].replace(/\D/g, "")),
                "marketPrice": Number(perse[i].find((el: string[]) => el[1] === " Цена:")[2].replace(/\D/g, "")),
                "course": Number(perse[i].find((el: string[]) => el[1] === "Курс:")[2].replace(/\D/g, "")),
                "purpose": (perse[i].find((el: string[]) => el[1] === "Цель:") || [1,1,null])[2],
                //"timeStop": lot.find(el => el[1] === "Истекает:")[2].replaceAll(" ", "").replace("ч", "").replace("м", "").split(","),
                "name": names[i],
                "slot": i

            })
        }
        marketMy = Number(perse[0].find((el: string[]) => el[1] === " Биржа баланс:")[2].replace(/\D/g, ""))


        return {data: smart, marketMy}
    },*/
    decoderText: (bot) => {
        let ans = {
            data: [],
            marketMy: -1
        };
        if (!bot.currentWindow)
            return ans;
        for (const slot of bot.currentWindow.slots) {
            if (!slot)
                continue;
            const lore = item.getLore(slot);
            if (!lore)
                continue;
            const dealer = lore.match(/Дилер: \w+/)?.[0].match(/ \w+/)?.[0].trim();
            const price = Number(lore.match(/Монет: \$[,0-9]+/)?.[0].replace(/\D/g, ""));
            const marketPrice = Number(lore.match(/Цена: \d+/)?.[0].replace(/\D/g, ""));
            const course = Number(lore.match(/Курс: \$[0-9,]+/)?.[0].replace(/\D/g, ""));
            const purpose = lore.match(/Цель: \w+/)?.[0].match(/ \w+/)?.[0].trim();
            if (!dealer || isNaN(price) || isNaN(marketPrice) || isNaN(course))
                continue;
            ans.data.push({
                "dealer": dealer,
                "price": price,
                "marketPrice": marketPrice,
                "course": course,
                "purpose": purpose,
                //"timeStop": lot.find(el => el[1] === "Истекает:")[2].replaceAll(" ", "").replace("ч", "").replace("м", "").split(","),
                "name": slot.name,
                "slot": slot.slot
            });
            const marketMy = Number(lore.match(/Биржа баланс: [0-9]+/)?.[0].replace(/\D/g, ""));
            if (isNaN(marketMy))
                continue;
            ans.marketMy = marketMy;
        }
        return ans;
    }
};
export default parseDM;
