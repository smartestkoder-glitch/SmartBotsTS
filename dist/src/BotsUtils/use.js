import func from './function.js';
export default {
    start: (bot, lefthand = false) => {
        if (!bot.smart.vars.work)
            return;
        if (bot.version !== "1.21.1")
            bot.activateItem(lefthand);
        else {
            if (bot.heldItem) {
                bot._client.write('position_look', {
                    "x": bot.entity.position.x,
                    "y": bot.entity.position.y,
                    "z": bot.entity.position.z,
                    "yaw": -74.00769805908203,
                    "pitch": 89.69999694824219,
                    "onGround": true
                });
                bot._client.write('use_item', { "hand": 0, "sequence": "Залупа бобра" });
                bot._client.write('arm_animation', { "hand": 0 });
            }
        }
    },
    end: (bot) => {
        if (!bot.smart.vars.work)
            return;
        bot.deactivateItem();
    },
    time: async (bot, time, lefthand = false) => {
        bot.activateItem(lefthand);
        await func.delay(time);
        bot.deactivateItem();
    }
};
