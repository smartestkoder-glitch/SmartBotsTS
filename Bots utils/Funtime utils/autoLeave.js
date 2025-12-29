import func from "../function.js"
import restart from "./restart.js";

const autoLeave = {

    getNicks: () => {
        const txtNicks = func.readToProjectFile("autoLeave.txt")
        const goodNicks = txtNicks.split("\n")

        const newNicks = []

        for (const nick of goodNicks) {
            const nickS = nick.replace("\r", "").replace(" ", "").toLowerCase()
            if (!nickS) continue
            newNicks.push(nickS)
        }
        return newNicks
    },

    /**
     *
     * @param {import('mineflayer').Bot} bot
     */
    autoLeave: async (bot) => {
        bot.on('entityMoved', async (entity) => {
            if (entity.type === 'player' && entity.username !== bot.username) {
                if (autoLeave.getNicks().includes(entity.username.toLowerCase())) return
                const dx = entity.position.x - bot.entity.position.x
                const dz = entity.position.z - bot.entity.position.z
                const dy = entity.position.y - bot.entity.position.y
                const distance = Math.sqrt(dx*dx + dy*dy + dz*dz)

                if (distance < 200) {
                    await restart.default(bot,`Рядом с ботом игрок! Ник: ${entity.username.toLowerCase()} Дистанция: ${distance.toFixed(1)} блоков`)
                }
            }
        })
    }

}

export default autoLeave