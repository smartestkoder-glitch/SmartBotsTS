import func from './function.js';
export default async (bot, block, face, time) => {
    //if (Number(new Date().toLocaleDateString().toString().split(".")[0]) > 4) return
    try {
        if (block?.name === "air")
            return;
        bot.swingArm("right");
        bot._client.write('block_dig', {
            status: 0,
            location: block.position,
            face: face,
        });
        await func.delay(time);
        bot._client.write('block_dig', {
            status: 2,
            location: block.position,
            face: face,
            //sequence: 0
        });
    }
    catch (e) {
        func.output(`Ошибка: ${e}\n\nПо идеи, бот будет продолжать работать. Подождите 5 минут. Если бот не работает - перезагрузите его`, " ", "red", "bold");
    }
};
