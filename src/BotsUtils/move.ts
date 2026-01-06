import func from "./function.js"
import {Bot} from "mineflayer";

const move = {
    just: {
        forward: {
            start: (bot :Bot) => {

                bot.setControlState("forward", true)
            },
            stop: (bot :Bot) => {

                bot.setControlState("forward", false)
            }
        },
        back: {
            start: (bot :Bot) => {

                bot.setControlState("back", true)
            },
            stop: (bot :Bot) => {

                bot.setControlState("back", false)
            }
        },
        left: {
            start: (bot :Bot) => {

                bot.setControlState("left", true)
            },
            stop: (bot :Bot) => {

                bot.setControlState("left", false)
            }
        },
        right: {
            start: (bot :Bot) => {

                bot.setControlState("right", true)
            },
            stop: (bot :Bot) => {

                bot.setControlState("right", false)
            }
        },
        jump: {
            start: (bot :Bot) => {

                bot.setControlState("jump", true)
            },
            stop: (bot :Bot) => {

                bot.setControlState("jump", false)
            }
        },
        sprint: {
            start: (bot :Bot) => {

                bot.setControlState("sprint", true)
            },
            stop: (bot :Bot) => {

                bot.setControlState("sprint", false)
            }
        },
        sneak: {
            start: (bot :Bot) => {

                bot.setControlState("sneak", true)
            },
            stop: (bot :Bot) => {

                bot.setControlState("sneak", false)
            }
        },

    },

    time: {
        right: async (bot :Bot, ms :number) => {
            move.just.right.start(bot)
            await func.delay(ms)
            move.just.right.stop(bot)

        },
        left: async (bot :Bot, ms :number) => {
            move.just.left.start(bot)
            await func.delay(ms)
            move.just.left.stop(bot)
        },
        back: async (bot :Bot, ms :number) => {
            move.just.back.start(bot)
            await func.delay(ms)
            move.just.back.stop(bot)
        },
        forward: async (bot :Bot, ms :number) => {
            move.just.forward.start(bot)
            await func.delay(ms)
            move.just.forward.stop(bot)
        }

    },



}
export default move
