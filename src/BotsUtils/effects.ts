import {Bot} from "mineflayer";


const effect = {

    /**
     *
     * @param {import('mineflayer').Bot} bot
     * @return [] - Возвращает массив объектов с эффектами
     */
    getEffects: (bot :Bot) => {
        if (!bot.smart.vars.work) return

        let answer = []
        for (const effec of Object.values(bot.entity.effects)) {
            answer.push({
                "name": effect.effectNames[effec.id],
                "level": effec.amplifier + 1,
                "duration": effec.duration / 20
            })
        }
        return answer
    },

    /**
     *
     * @param {import('mineflayer').Bot} bot
     * @param effectName
     */
    findEffect: (bot :Bot, effectName :string) => {
        if (!bot.smart.vars.work) return

        const effects = effect.getEffects(bot)

        if (!effects) return

        return effects.find(effect => effect.name === effectName)
    },
    effectNames: {
        1: "Скорость",
        2: "Медлительность",
        3: "Ускорение копания",
        5: "Сила",
        8: "Прыжок",
        10: "Регенерация",
        11: "Сопротивление",
        12: "Огнестойкость",
        13: "Невидимость",
        16: "Ночное зрение"
    } as Record<number, string>
}
export default effect