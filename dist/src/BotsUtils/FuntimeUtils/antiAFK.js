import look from "../look.js";
const antiAFK = {
    /**
     *
     * @param {import('mineflayer').Bot} bot
     */
    randomLook: async (bot) => {
        const randomYaw = (Math.random() - 0.5) * 2 * 180;
        const randomPitch = (Math.random() - 0.5) * 2 * 90;
        look.look(bot, randomYaw, randomPitch);
    }
};
export default antiAFK;
