import digBlock from "../../Bots utils/digBlock.js";
import func from '../../Bots utils/function.js'
import item from "../../Bots utils/item.js"

const digCB = {
    /**
     * Пакеты на расстановку (сразу 2 по 4)
     * @param {import('mineflayer').Bot} bot
     * @param ms
     * @returns {Promise<void>}
     */
    digAllKaka: async (bot, ms = 10) => {


        digCB.digKaka(bot, bot.blockAt(bot.entity.position.offset(0, 2, 0)), 0, 10)
        await func.delay(ms + 10)

        digCB.digKaka(bot, bot.blockAt(bot.entity.position.offset(0, 3, 0)), 0, 10)
        await func.delay(ms + 10)

        digCB.digKaka(bot, bot.blockAt(bot.entity.position.offset(0, 4, 0)), 0, 10)
        await func.delay(ms + 10)

        digCB.digKaka(bot, bot.blockAt(bot.entity.position.offset(0, 5, 0)), 0, 10)
        await func.delay(ms + 10)
        //bot.digBlock(bot.bot.blockAt(bot.bot.entity.position.offset(0, 6, 0)), 0, 10)
        //await bot.waitSec(ms + 10)
        digCB.digKaka(bot, bot.blockAt(bot.entity.position.offset(0, 2, -1)), 0, 10)
        await func.delay(ms + 10)

        digCB.digKaka(bot, bot.blockAt(bot.entity.position.offset(0, 3, -1)), 0, 10)
        await func.delay(ms + 10)

        digCB.digKaka(bot, bot.blockAt(bot.entity.position.offset(0, 4, -1)), 0, 10)
        await func.delay(ms + 10)

        digCB.digKaka(bot, bot.blockAt(bot.entity.position.offset(0, 5, -1)), 0, 10)
        await func.delay(ms + 10)

    },


    /**
     * Пакеты на расстановку (1 по 4)
     * @param {import('mineflayer').Bot} bot
     * @param ms
     * @returns {Promise<void>}
     */
    digAllKakaNew: async (bot, ms = 10) => {

        digCB.digKaka(bot, bot.blockAt(bot.entity.position.offset(0, 2, 0)), 0, 10)
        await func.delay(ms + 10)

        digCB.digKaka(bot, bot.blockAt(bot.entity.position.offset(0, 3, 0)), 0, 10)
        await func.delay(ms + 10)

        digCB.digKaka(bot, bot.blockAt(bot.entity.position.offset(0, 4, 0)), 0, 10)
        await func.delay(ms + 10)

        digCB.digKaka(bot, bot.blockAt(bot.entity.position.offset(0, 5, 0)), 0, 10)
        await func.delay(ms + 10)

    },


    /**
     *
     * @param {import('mineflayer').Bot} bot
     * @param block
     * @param face
     * @param time
     */
    digKaka: (bot, block, face, time = 10) => {
        //if(!bot.heldItem) return func.output("бот ничего не держит в руке!", "ЛОМАНИЕКАКА", true)
        if(block?.name === "cocoa_beans" && block._properties?.age !== 3) return func.output("здесь НЕ какао боб или он не вырос", "ЛОМАНИЕКАКА", true) //Отклоняем ломание, если какао боб не вырос/его нет
        //if(bot.heldItem.name.includes("axe") && item.getDurability.unit(bot.heldItem) < 5) return func.output("топор почти сломалмся!", "ЛОМАНИЕКАКА", true)//Отклоняем ломание, если на топоре мало прочности
        //if(!bot.heldItem.name.includes("axe")) return func.output("бот держит НЕ топор в руке", "ЛОМАНИЕКАКА", true)//Отклоняем ломание, если в руке не топор
        digBlock(bot, block, face, time) //Отправка пакета
    }
}

export default digCB