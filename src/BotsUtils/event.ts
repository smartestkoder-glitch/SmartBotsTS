import {Bot} from "mineflayer";

const event = {

    spawn: (bot :Bot, func : () => void | Promise<void>) => {
        bot.on("spawn", func);
    },

    spawnOnce: (bot :Bot, func : () => void | Promise<void>) => {
        bot.once("spawn", func);
    },


    chat: (bot :Bot, func : () => void | Promise<void>) => {
        bot.on("chat", func);
    },

    message: (bot :Bot, func : (msg: any) => void | Promise<void>) => {
        bot.on("message", func);
    },

    login: (bot :Bot, func : () => void | Promise<void>) => {
        bot.on("login", func);
    },

    end: (bot :Bot, func : (msg :string) => void | Promise<void>) => {
        bot.on("end", func);
    },

    error: (bot :Bot, func : () => void | Promise<void>) => {
        bot.on("error", func);
    },

    kicked: (bot :Bot, func : (mes : any) => void | Promise<void>) => {
        bot.on("kicked", func);
    },

    death: (bot :Bot, func : () => void | Promise<void>) => {
        bot.on("death", func);
    },

    health: (bot :Bot, func : () => void | Promise<void>) => {
        bot.on("health", func);
    },

    move: (bot :Bot, func : () => void | Promise<void>) => {
        bot.on("move", func);
    },

    physicsTick: (bot :Bot, func : () => void | Promise<void>) => {
        bot.on("physicsTick", func);
    },

    time: (bot :Bot, func : () => void | Promise<void>) => {
        bot.on("time", func);
    },

    entityHurt: (bot :Bot, func : () => void | Promise<void>) => {
        bot.on("entityHurt", func);
    },

    entitySwingArm: (bot :Bot, func : () => void | Promise<void>) => {
        bot.on("entitySwingArm", func);
    },

    entityMoved: (bot :Bot, func : () => void | Promise<void>) => {
        bot.on("entityMoved", func);
    },

    playerJoined: (bot :Bot, func : () => void | Promise<void>) => {
        bot.on("playerJoined", func);
    },

    playerLeft: (bot :Bot, func : () => void | Promise<void>) => {
        bot.on("playerLeft", func);
    },

    windowOpen: (bot :Bot, func : () => void | Promise<void>) => {
        bot.on("windowOpen", func);
    },

    windowClose: (bot :Bot, func : () => void | Promise<void>) => {
        bot.on("windowClose", func);
    },

    experience: (bot :Bot, func : () => void | Promise<void>) => {
        bot.on("experience", func);
    },

    soundEffectHeard: (bot :Bot, func : () => void | Promise<void>) => {
        bot.on("soundEffectHeard", func);
    }
}
export default event