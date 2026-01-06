import FlayerCaptcha from "flayercaptcha";
import sharp, {Sharp} from "sharp";
import func from "../function.js";
import {Bot} from "mineflayer";

const autoAuth = {

    saveCaptcha: (bot :Bot) => {
        const captcha = new FlayerCaptcha(bot)
        captcha.on('imageReady', async ({ data, image } : {data: {facing :string}, image: Sharp}) => {

            bot.smart.vars.captcha.facing[data.facing] = image
            func.output("Капча загружена!", "dev", "green", "bold")
        })
    },

    toBufferCaptcha: async (bot :Bot, facing :string) => {
        const image = bot.smart.vars.captcha.facing[facing]

        if (!image) return
        const resizedBuffer = await image.toBuffer().then((buf: sharp.SharpOptions | undefined) => sharp(buf).resize(250, 150, {
            fit: 'fill'
        }).toBuffer().then(buf => buf.toString("base64")));
        return resizedBuffer
    },

    site: "http://5.42.211.111/",

    sendAPI: async (buffer :string) => {

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
        func.output("Капча отправлена на обработку...", undefined,  "yellow", "bold");


        const captcha_id = postText.split("|")[1].trim();
        await func.delay(500)

        const getData = new URLSearchParams({
            key: "SrxoHnraiKimWDjyOKXJxJIjs",
            action: "get",
            id: captcha_id
        });

        const getResponse = await fetch(`${autoAuth.site}/res.php?${getData}`);
        const getText = await getResponse.text();
        if (getText.split("|")[0] === "OK") func.output(`Ответ на капчу получен! Ответ: ${getText.toString()}`, undefined,  "green", "bold");
        if (getText.split("|")[0] !== "OK") func.output(`Ошибка распознавания капчи! Ответ: ${getText.toString()}`, undefined,  "red", "bold");




        return getText


    },

    solver: async (bot :Bot) => {

        const funcSolver = async (mes :any) => {

            const mesClean = mes?.extra?.map((el: { text: any; }) => el?.text)?.join("")
            if (bot.smart.vars.captcha.solving) return

            bot.smart.vars.captcha.solving = true

            if (!mesClean?.startsWith("BotFilter")) {
                bot.removeListener("message", funcSolver)
            }

            if (mesClean?.startsWith("BotFilter >> Введите номер с картинки в чат")) {
                const image = bot.smart.vars.captcha.facing.forward

                func.output("Начинаю обработку капчи...", undefined, "green", "bold")
                if (!image) {
                    func.output("Капча не найдена! Ввожу случайное число...", undefined, "red", "bold")
                    await func.delay(500)
                    bot.chat(Math.floor(Math.random() * 100000).toString())
                    bot.smart.vars.captcha.solving = false
                    return
                }

                const buffer = await autoAuth.toBufferCaptcha(bot, "forward")

                const answer = await autoAuth.sendAPI(buffer)


                const answerText = answer.split("|")

                if (answerText[0] === "OK") {
                    await func.delay(500)
                    bot.chat(answerText[1])
                }
                bot.smart.vars.captcha.solving = false

            }
            bot.smart.vars.captcha.solving = false
        }

        let captchaChat = bot.on("message", funcSolver)
    },



    autoLogin: async (bot :Bot) => {

        const autoLoginFunc = async (mes :any) => {
            const mesClean = mes?.extra?.map((el: { text: any; }) => el?.text)?.join("")


            if (mesClean?.startsWith("[✾] Зарегистрируйтесь ↝ /reg <Пароль>")) {
                await func.delay(500)
                bot.chat("/reg " + bot.smart.vars.settings.password)
                //bot.removeListener("message", autoLoginFunc)
            }
            if (mesClean?.startsWith("[✾] Войдите в игру ↝ /login <Пароль>")) {
                bot.chat("/login " + bot.smart.vars.settings.password)
                //bot.removeListener("message", autoLoginFunc)
            }

            if (mesClean?.startsWith("[✾] Успешная авторизация! Приятной игры!")) {
                bot.removeListener("message", autoLoginFunc)
            }
        }

        bot.on("message", autoLoginFunc)
    }


}

export default autoAuth