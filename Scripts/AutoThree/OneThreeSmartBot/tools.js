import func from "../../../Bots utils/function.js"
import inventory from "../../../Bots utils/inventory.js"
import item from "../../../Bots utils/item.js"
import window from "../../../Bots utils/window.js"


const threeTools = {

    findOrigTools: (slots) => {
        if (!slots) return

        return {
            //axe: slots.find(axe => axe?.components[4]?.data?.enchantments?.map(el => el?.id).find(el => el === 39) && axe?.name === "diamond_axe"),
            axe: slots.find(axe => axe?.componentMap?.get('enchantments')?.data?.enchantments?.find(el => el?.id === 39) && axe?.name === "diamond_axe"),
            hoe: slots.find(axe => axe?.componentMap?.get('enchantments')?.data?.enchantments?.find(el => el?.id === 39) && axe?.name === "diamond_hoe")

        }
    },
    findEmeraldTools: (slots) => {
        if (!slots) return

        return {
            axe: slots.find(axe => axe?.name === "diamond_axe" && item.getEnchant(axe).length === 1),
            hoe: slots.find(hoe => hoe?.name === "diamond_hoe" && item.getEnchant(hoe).length === 1),
        }
    },

    findAllOrigTools: (slots) => {
        if (!slots) return

        return {
            axe: slots.filter(axe => axe?.componentMap?.get('enchantments')?.data?.enchantments?.find(el => el?.id === 39) && axe?.name === "diamond_axe"),
            hoe: slots.filter(axe => axe?.componentMap?.get('enchantments')?.data?.enchantments?.find(el => el?.id === 39) && axe?.name === "diamond_hoe")

        }
    },

    findBrokenOrigTools: (slots) => {
        if (!slots) return
        return slots.find(axe => axe?.componentMap?.get('enchantments')?.data?.enchantments?.find(el => el?.id === 39) && item.getDurability.unit(axe) < 450)
    },
    findNormalOrigTool: (slots) => {
        if (!slots) return

        return slots.find(axe => axe?.componentMap?.get('enchantments')?.data?.enchantments?.find(el => el?.id === 39) && !(item.getDurability.unit(axe) < 450))
    },
    findAllNormalOrigTools: (slots) => {
        if (!slots) return

        return slots.filter(axe => axe?.componentMap?.get('enchantments')?.data?.enchantments?.find(el => el?.id === 39) && !(item.getDurability.unit(axe) < 450))
    }

}

export default threeTools