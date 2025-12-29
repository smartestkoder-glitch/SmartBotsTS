export default {

    spawn: (bot, func) => {
        bot.on("spawn", func);
    },

    spawnOnce: (bot, func) => {
        bot.once("spawn", func);
    },


    chat: (bot, func) => {
        bot.on("chat", func);
    },

    message: (bot, func) => {
        bot.on("message", func);
    },

    login: (bot, func) => {
        bot.on("login", func);
    },

    end: (bot, func) => {
        bot.on("end", func);
    },

    error: (bot, func) => {
        bot.on("error", func);
    },

    kicked: (bot, func) => {
        bot.on("kicked", func);
    },

    death: (bot, func) => {
        bot.on("death", func);
    },

    health: (bot, func) => {
        bot.on("health", func);
    },

    move: (bot, func) => {
        bot.on("move", func);
    },

    physicsTick: (bot, func) => {
        bot.on("physicsTick", func);
    },

    time: (bot, func) => {
        bot.on("time", func);
    },

    entityHurt: (bot, func) => {
        bot.on("entityHurt", func);
    },

    entitySwingArm: (bot, func) => {
        bot.on("entitySwingArm", func);
    },

    entityMoved: (bot, func) => {
        bot.on("entityMoved", func);
    },

    playerJoined: (bot, func) => {
        bot.on("playerJoined", func);
    },

    playerLeft: (bot, func) => {
        bot.on("playerLeft", func);
    },

    windowOpen: (bot, func) => {
        bot.on("windowOpen", func);
    },

    windowClose: (bot, func) => {
        bot.on("windowClose", func);
    },

    experience: (bot, func) => {
        bot.on("experience", func);
    },

    soundEffectHeard: (bot, func) => {
        bot.on("soundEffectHeard", func);
    }
}
