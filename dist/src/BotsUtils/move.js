import func from "./function.js";
const move = {
    just: {
        forward: {
            start: (bot) => {
                bot.setControlState("forward", true);
            },
            stop: (bot) => {
                bot.setControlState("forward", false);
            }
        },
        back: {
            start: (bot) => {
                bot.setControlState("back", true);
            },
            stop: (bot) => {
                bot.setControlState("back", false);
            }
        },
        left: {
            start: (bot) => {
                bot.setControlState("left", true);
            },
            stop: (bot) => {
                bot.setControlState("left", false);
            }
        },
        right: {
            start: (bot) => {
                bot.setControlState("right", true);
            },
            stop: (bot) => {
                bot.setControlState("right", false);
            }
        },
        jump: {
            start: (bot) => {
                bot.setControlState("jump", true);
            },
            stop: (bot) => {
                bot.setControlState("jump", false);
            }
        },
        sprint: {
            start: (bot) => {
                bot.setControlState("sprint", true);
            },
            stop: (bot) => {
                bot.setControlState("sprint", false);
            }
        },
        sneak: {
            start: (bot) => {
                bot.setControlState("sneak", true);
            },
            stop: (bot) => {
                bot.setControlState("sneak", false);
            }
        },
    },
    time: {
        right: async (bot, ms) => {
            move.just.right.start(bot);
            await func.delay(ms);
            move.just.right.stop(bot);
        },
        left: async (bot, ms) => {
            move.just.left.start(bot);
            await func.delay(ms);
            move.just.left.stop(bot);
        },
        back: async (bot, ms) => {
            move.just.back.start(bot);
            await func.delay(ms);
            move.just.back.stop(bot);
        },
        forward: async (bot, ms) => {
            move.just.forward.start(bot);
            await func.delay(ms);
            move.just.forward.stop(bot);
        }
    },
};
export default move;
