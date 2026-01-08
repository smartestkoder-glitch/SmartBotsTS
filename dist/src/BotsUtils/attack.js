import func from "./function.js";
const attack = {
    /**
     *
     * @param {import('mineflayer').Bot} bot
     */
    attack: (bot) => {
        if (!bot.smart.vars.work)
            return;
        const entity = bot.entityAtCursor();
        const type = entity?.type;
        if (type)
            bot.attack(entity);
        else
            bot.swingArm("right");
    },
    clicker: async (bot, kd, status) => {
        if (!bot.smart.vars.work)
            return;
        if (bot.smart?.vars?.default?.clickerAttack && !status)
            bot.smart.vars.default.clickerAttack = false;
        else if (bot.smart?.vars?.default?.clickerAttack === false && status)
            bot.smart.vars.default.clickerAttack = true;
        else
            return;
        while (bot.smart.vars.default.clickerAttack) {
            attack.attack(bot);
            await func.delay(kd);
        }
    }
};
export default attack;
