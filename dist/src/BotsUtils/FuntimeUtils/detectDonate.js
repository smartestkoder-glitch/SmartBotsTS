import restart from "../restart.js";
const detectDonate = {
    get: (bot) => {
        return bot.smart.vars.donate;
    },
    startDetect: (bot) => {
        bot._client.on("teams", (packet) => {
            //func.outputObject(packet)
            const don = packet?.prefix?.value?.extra?.value?.value[3]?.text?.value;
            if (!don || packet?.team === 'TAB-Sidebar-4')
                return;
            if (bot.smart.vars.donate === undefined)
                return restart.fatal("Отсутствует донат в переменных бота!");
            bot.smart.vars.donate = don;
        });
    },
    slots: {
        oldVersion: {
            "Игрок": 3,
            "Барон": 6,
            "Страж": 7,
            "Герой": 8,
            "Аспид": 9,
            "Сквид": 10,
            "Глава": 11,
            "Элита": 12,
            "Титан": 13,
            "Принц": 14,
            "Князь": 15,
            "Герцог": 15,
            "": 0
        },
        newVersion: {
            "Игрок": 3,
            "Барон": 6,
            "Страж": 7,
            "Герой": 8,
            "Аспид": 9,
            "Сквид": 10,
            "Глава": 11,
            "Элита": 12,
            "Титан": 13,
            "Принц": 14,
            "Князь": 15,
            "Герцог": 15,
            "": 0
        }
    }
};
export default detectDonate;
