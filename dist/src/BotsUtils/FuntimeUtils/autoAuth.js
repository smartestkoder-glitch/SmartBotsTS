import FlayerCaptcha from "flayercaptcha";
import sharp from "sharp";
import func from "../function.js";
import restart from "../restart.js";
const autoAuth = {
    saveCaptcha: (bot) => {
        const captcha = new FlayerCaptcha(bot);
        captcha.on('imageReady', async ({ data, image }) => {
            bot.smart.vars.captcha.facing[data.facing] = image;
            func.output("Капча загружена!", "dev", "green", "bold");
        });
    },
    toBufferCaptcha: async (bot, facing) => {
        const image = bot.smart.vars.captcha.facing[facing];
        if (!image)
            return;
        const resizedBuffer = await image.toBuffer().then((buf) => sharp(buf).resize(250, 150, {
            fit: 'fill'
        }).toBuffer().then(buf => buf.toString("base64")));
        return resizedBuffer;
    },
    site: "http://5.42.211.111/",
    sendAPI: async (buffer) => {
        const postData = new URLSearchParams({
            key: "SrxoHnraiKimWDjyOKXJxJIjs",
            method: "base64",
            body: buffer
        });
        const postResponse = await fetch(`${autoAuth.site}/in.php`, {
            method: "POST",
            body: postData
        });
        const postText = await postResponse.text();
        func.output("Капча отправлена на обработку...", undefined, "yellow", "bold");
        const captcha_id = postText.split("|")[1].trim();
        await func.delay(500);
        const getData = new URLSearchParams({
            key: "SrxoHnraiKimWDjyOKXJxJIjs",
            action: "get",
            id: captcha_id
        });
        const getResponse = await fetch(`${autoAuth.site}/res.php?${getData}`);
        const getText = await getResponse.text();
        if (getText.split("|")[0] === "OK")
            func.output(`Ответ на капчу получен! Ответ: ${getText.toString()}`, undefined, "green", "bold");
        if (getText.split("|")[0] !== "OK")
            func.output(`Ошибка распознавания капчи! Ответ: ${getText.toString()}`, undefined, "red", "bold");
        return getText;
    },
    solver: async (bot) => {
        autoAuth.saveCaptcha(bot);
        const funcSolver = async (mes) => {
            const mesClean = mes?.extra?.map((el) => el?.text)?.join("");
            if (bot.smart.vars.captcha.solving)
                return;
            bot.smart.vars.captcha.solving = true;
            if (!mesClean?.startsWith("BotFilter")) {
                bot.removeListener("message", funcSolver);
            }
            if (mesClean?.startsWith("BotFilter >> Введите номер с картинки в чат")) {
                const image = bot.smart.vars.captcha.facing.forward;
                func.output("Начинаю обработку капчи...", undefined, "green", "bold");
                if (!image) {
                    func.output("Капча не найдена! Ввожу случайное число...", undefined, "red", "bold");
                    await func.delay(500);
                    bot.chat(Math.floor(Math.random() * 100000).toString());
                    bot.smart.vars.captcha.solving = false;
                    return;
                }
                const buffer = await autoAuth.toBufferCaptcha(bot, "forward");
                if (!buffer) {
                    func.output("Капча неудачно преобразованна! Ввожу случайное число...", "", "red", "bold");
                    await func.delay(500);
                    bot.chat(Math.floor(Math.random() * 100000).toString());
                    bot.smart.vars.captcha.solving = false;
                    return;
                }
                const answer = await autoAuth.sendAPI(buffer);
                const answerText = answer.split("|");
                if (answerText[0] === "OK") {
                    await func.delay(500);
                    bot.chat(answerText[1]);
                }
                bot.smart.vars.captcha.solving = false;
            }
            bot.smart.vars.captcha.solving = false;
        };
        let captchaChat = bot.on("message", funcSolver);
    },
    autoLogin: async (bot) => {
        const autoLoginFunc = async (mes) => {
            const mesClean = mes?.extra?.map((el) => el?.text)?.join("");
            if (mesClean?.startsWith("[✾] Зарегистрируйтесь ↝ /reg <Пароль>")) {
                await func.delay(500);
                if (!bot.smart.vars.config.settings?.password)
                    return restart.fatal("Отсутствует пароль в переменных бота!");
                bot.chat("/reg " + bot.smart.vars.config.settings.password);
                //bot.removeListener("message", autoLoginFunc)
            }
            if (mesClean?.startsWith("[✾] Войдите в игру ↝ /login <Пароль>")) {
                if (!bot.smart.vars.config.settings?.password)
                    return restart.fatal("Отсутствует пароль в переменных бота!");
                bot.chat("/login " + bot.smart.vars.config.settings.password);
                //bot.removeListener("message", autoLoginFunc)
            }
            if (mesClean?.startsWith("[✾] Успешная авторизация! Приятной игры!")) {
                bot.removeListener("message", autoLoginFunc);
            }
        };
        bot.on("message", autoLoginFunc);
    }
};
export default autoAuth;
