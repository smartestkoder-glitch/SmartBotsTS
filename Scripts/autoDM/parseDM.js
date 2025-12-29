import func from "../../Bots utils/function.js"

const parseDM = {

    decoder: (bot) => {
        const perse = bot.currentWindow.slots.map(el => el?.components?.find(el => el?.type === "lore")?.data?.map(el => el?.value?.extra?.value?.value?.map(el => el?.text?.value))).filter(data => data?.length > 8).map(el => el.filter(str => str.length > 2))
        const names = bot.currentWindow?.slots?.map(el => el?.components?.find(el1 => el1?.type === "custom_name")?.data?.value?.extra?.value?.value[1]?.text?.value?.trim()).filter(el4 => el4)

        let marketMy

        const smart = []

        for (let i = 0; i < perse.length; i++) {
            smart.push({
                "dealer": perse[i].find(el => el[1] === "Дилер:")[2],
                "price": Number(perse[i].find(el => el[1] === "Монет:")[2].replace(/\D/g, "")),
                "marketPrice": Number(perse[i].find(el => el[1] === " Цена:")[2].replace(/\D/g, "")),
                "course": Number(perse[i].find(el => el[1] === "Курс:")[2].replace(/\D/g, "")),
                "purpose": (perse[i].find(el => el[1] === "Цель:") || [1,1,null])[2],
                //"timeStop": lot.find(el => el[1] === "Истекает:")[2].replaceAll(" ", "").replace("ч", "").replace("м", "").split(","),
                "name": names[i]

            })
        }
        marketMy = Number(perse[0].find(el => el[1] === " Биржа баланс:")[2].replace(/\D/g, ""))


        return {data: smart, marketMy}
    }

}
export default parseDM