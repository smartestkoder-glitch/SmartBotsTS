import effect from "./effects.js"
import func from "./function.js"

export default {
    getLore: (item) => {

        return JSON.parse(item?.nbt?.value?.display?.value?.Lore?.value?.value[0])?.extra?.map(el => el.text).join("")

    },



    getEnchant: (item) => {

        return item?.componentMap?.get('enchantments')?.data?.enchantments || []
    },

    getEffectFromPotion: (item) => {

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

        unit: (item) => {

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

        percent: (item) => {

            const damage = item?.nbt?.value?.Damage?.value || item?.componentMap?.get("damage")?.data
            const maxDurability = item?.maxDurability
            if ((damage || damage === 0) && maxDurability) {
                return (maxDurability - damage)/maxDurability*100
            }
            else {
                func.output(`Произошла попытка узнавания прочности предмета, у которого нет прочности! Предмет: ${item?.name}`, "ПРЕДУПРЕЖДЕНИЕ")
            }
        }
    }
}