import func from "./function.js";
export default (bot, block, face, item, hand, cx = 0.5, cy = 1, cz = 0.5) => {
    if (!bot.smart.vars.work)
        return;
    try {
        const item1 = bot.inventory.slots.find(i => i?.name === item);
        if (!item1)
            return;
        if (!bot.heldItem)
            return;
        if (bot.heldItem?.name !== item && hand === 0)
            return;
        if (bot.inventory.slots[45]?.name !== item && hand === 1)
            return;
        //if (bot.blockAt(block.position.offset(0, 1, 0)).name !== "air" && face === 1) return
        //if (bot.blockAt(block.position.offset(0, 0, -1)).name !== "air" && face === 2) return
        if (bot.blockAt(block.position.offset(0, 0, 1))?.name !== "air" && face === 3)
            return;
        if (bot.blockAt(block.position.offset(-1, 0, 0))?.name !== "air" && face === 4)
            return;
        if (bot.blockAt(block.position.offset(1, 0, 0))?.name !== "air" && face === 5)
            return;
        //if (bot.blockAt(block.position.offset(0,-1,-1)).name !== "soul_sand" && face === 2 && item === "nether_wart") return
        if (hand === 0)
            bot.swingArm("right");
        if (hand === 1)
            bot.swingArm("left");
        bot._client.write('block_place', {
            hand: hand,
            location: block.position,
            direction: face,
            heldItem: bot.registry.items[item1.type],
            cursorX: cx,
            cursorY: cy,
            cursorZ: cz
        });
        func.output("123123123gfrtn");
    }
    catch (e) {
        func.output("ХУИТА ПОМОЙНАЯ! АШИБКА! ПИЗДЕЦ!");
    }
};
