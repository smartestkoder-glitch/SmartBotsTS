import effect from "./effects.js"
import func from "./function.js"

import {colorText} from "../types/colotTextItem"
import {Item} from "prismarine-item";

const itemFunc = {




    getEnchant: (item :any) => {

        return item?.componentMap?.get('enchantments')?.data?.enchantments || []
    },

    getEffectFromPotion: (item :any) => {

        if (item?.nbt?.value?.Potion?.value !== "minecraft:empty") return [
            {
                "name": item?.nbt?.value?.Potion?.value,
                "duration": 0,
                "level": 0
            }
        ]
        else  {
            let ans = []
            for (const eff of item?.nbt?.value?.CustomPotionEffects?.value?.value) {
                ans.push({
                    "name": effect.effectNames[eff.Id.value],
                    "duration": eff.Duration.value / 20,
                    "level": eff.Amplifier.value + 1
                })
            }
            return ans
        }

    },

    getDurability: {

        unit: (item :any) => {

            const damage = item?.nbt?.value?.Damage?.value || item?.componentMap?.get("damage")?.data || 0
            const maxDurability = item?.maxDurability
            if ((damage || damage === 0) && maxDurability) {
                return maxDurability - damage
            }
            else {
                func.output(`Произошла попытка узнавания прочности предмета, у которого нет прочности! Предмет: ${item?.name}`, "ПРЕДУПРЕЖДЕНИЕ")
                return undefined
            }
        },

        percent: (item :any) => {

            const damage = item?.nbt?.value?.Damage?.value || item?.componentMap?.get("damage")?.data
            const maxDurability = item?.maxDurability
            if ((damage || damage === 0) && maxDurability) {
                return (maxDurability - damage)/maxDurability*100
            }
            else {
                func.output(`Произошла попытка узнавания прочности предмета, у которого нет прочности! Предмет: ${item?.name}`, "ПРЕДУПРЕЖДЕНИЕ")
            }
        }
    },

    createTextFromColorText: (colorText: ((colorText[]) | undefined)[])=> {
        let ans : string[] = []
        colorText.forEach(el => {
            if (!el) ans.push("")
            else el.forEach(el2 => {
                const text = el2.text?.value
                if (!text) ans.push("")
                else ans.push(text)
            })
            ans.push("\n")
        })
        const ans1 = ans.join("")
        return ans1
    },

    getItemLoreJson: (item :Item) => {
        return item.components?.find(el => el.type === "lore")?.data
    },

    getColorTextJson: (item : Item) => {
        const lore = itemFunc.getItemLoreJson(item)
        let ans :((colorText[]) | undefined)[] = []
        lore?.forEach(el => {

            ans.push(el?.value?.extra?.value?.value)
        })
        return ans
    },

    getLore: (item :Item) => {
        const colorText = itemFunc.getColorTextJson(item)
        if (!colorText) return
        return itemFunc.createTextFromColorText(colorText)
    }
}

export default itemFunc