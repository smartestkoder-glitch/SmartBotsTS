import botsUtils from "../BotsUtils/index.js";
const bot = await botsUtils.connect({
    username: "MomentMoneyEz",
    proxy: "",
    server: "localhost:25566",
    version: "1.16.5",
    settings: {
        anarchy: "/an216"
    }
});
bot.on("spawn", async () => {
    await botsUtils.FunTimeUtils.restartAnarchy.restartIfHub(bot);
    botsUtils.move.just.left.start(bot);
});
