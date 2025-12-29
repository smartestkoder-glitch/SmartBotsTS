import placeBlock from "../../Bots utils/placeBlock.js"
import func from "../../Bots utils/function.js"

const placeCB = {
    placeOne: (bot, block, face) => {

        let cx = 0, cy = 0, cz = 0
        const pos = bot.entity.position
//Отклоняем расстановку блока, если там уже есть блок (или если блок не найден)
        if (![4, 5, 0].includes(face)) return
        const blockCheck = bot.blockAt(block?.position?.offset(-1, 0, 0))?.name

        if (face === 4 && blockCheck !== "air" || !block) return
        const blockCheck1 = bot.blockAt(block?.position?.offset(1, 0, 0))?.name
        if (face === 5 && blockCheck1 !== "air" || !block) return
        const blockCheck2 = bot.blockAt(block?.position?.offset(0, -1, 0))?.name
        if (face === 0 && blockCheck2 !== "air" || !block) return

//Отклоняем расстановку блока, если нет блока, о который можно опереться (или если блок не найден)
        if ((block?.name !== "jungle_wood" && block?.name !== "jungle_log") && (face === 4 || face === 5)) return
        if ((bot.blockAt(block?.position?.floored().offset(0, -1, -1))?.name !== "jungle_wood"
                && bot.blockAt(block?.position?.floored().offset(0, -1, -1))?.name !== "jungle_log")
            && (bot.blockAt(block?.position?.floored().offset(0, -1, 1))?.name !== "jungle_wood"
                && bot.blockAt(block?.position?.floored().offset(0, -1, 1))?.name !== "jungle_log")
            && face === 0) return

//if (face === 0 && block?.name !== "cocoa") return console.log(6)

        if (face === 0 && block?.name === "cocoa") {
            cx = Math.abs(pos.x - pos.floored().x)
            cy = 0.4375
            cz = Math.abs(pos.z - pos.floored().z)
        } else {
            cx = Math.abs(pos.x - pos.floored().x)
            cy = 0
            cz = Math.abs(pos.z - pos.floored().z)
        }
        if (face === 4) {
            cx = 0
            cy = 0.5
            cz = Math.abs(pos.z - pos.floored().z)
        }
        if (face === 5) {
            cx = 1
            cy = 0.5
            cz = Math.abs(pos.z - pos.floored().z)
        }

        placeBlock(bot, block, face, "cocoa_beans", cx, cy, cz)
    },
    placeAll: async (bot, ms) => {
        placeCB.placeOne(bot, bot.blockAt(bot.entity.position.offset(0, 6, 0)), 0)
        await func.delay(ms)
        placeCB.placeOne(bot, bot.blockAt(bot.entity.position.offset(0, 5, 0)), 0)
        await func.delay(ms)
        placeCB.placeOne(bot, bot.blockAt(bot.entity.position.offset(0, 4, 0)), 0)
        await func.delay(ms)
        placeCB.placeOne(bot, bot.blockAt(bot.entity.position.offset(0, 3, 0)), 0)
        await func.delay(ms)


        placeCB.placeOne(bot, bot.blockAt(bot.entity.position.offset(0, 6, -1)), 0)
        await func.delay(ms)
        placeCB.placeOne(bot, bot.blockAt(bot.entity.position.offset(0, 5, -1)), 0)
        await func.delay(ms)
        placeCB.placeOne(bot, bot.blockAt(bot.entity.position.offset(0, 4, -1)), 0)
        await func.delay(ms)
        placeCB.placeOne(bot, bot.blockAt(bot.entity.position.offset(0, 3, -1)), 0)
        await func.delay(ms)

    },

    placeAllNew: async (bot, ms) => {
        placeCB.placeOne(bot, bot.blockAt(bot.entity.position.offset(0, 6, 0)), 0)
        await func.delay(ms)
        placeCB.placeOne(bot, bot.blockAt(bot.entity.position.offset(0, 5, 0)), 0)
        await func.delay(ms)
        placeCB.placeOne(bot, bot.blockAt(bot.entity.position.offset(0, 4, 0)), 0)
        await func.delay(ms)
        placeCB.placeOne(bot, bot.blockAt(bot.entity.position.offset(0, 3, 0)), 0)
        await func.delay(ms)
    }
}

export default placeCB