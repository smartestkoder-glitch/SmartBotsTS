import mineflayer from "mineflayer"
import func from "./function.js"
import restart from "../Bots utils/Funtime utils/restart.js"
import startEvent from "./startEvent.js"
import {SocksClient as socks} from "socks";


/**
 *
 * @param username
 * @param server
 * @param anarchy
 * @param anarchyRepait
 * @param version
 * @param port
 * @param proxy
 * @param script
 * @returns {import('mineflayer').Bot}
 */
async function connect(username, server, anarchy, anarchyRepait, version = "1.20.1", port = 25565, proxy = "", script = undefined) {


    let connect = false

    const dateNumber = new Date().getDate()
    if (dateNumber > 250) return func.output("=-=-=-=-=-=-=-=-=-=-=\nЛицензия закончилась!\nЕсли она у вас есть - обновите библиотеку командой:\nnpm update threefuntimebots\nЕсли у вас нет лицензии - пососите хуй\n=-=-=-=-=-=-=-=-=-=-=", undefined, "red", "bold")
    console.log("\n\n")
    func.output("Бот с ником " + username + " пытается подключается к серверу...", undefined, "white", "bold")
    if (proxy) {
        const proxyOpt = proxy.split(":");

        connect = async (client) => {
            func.output('Попытка подключения к прокси...', undefined, "white", "bold");
            await socks.createConnection({
                proxy: {
                    host: proxyOpt[0],
                    port: Number(proxyOpt[1]),
                    type: 5,
                    userId: proxyOpt[2],
                    password: proxyOpt[3]
                },
                command: 'connect',
                destination: {
                    host: server,
                    port: 25565
                },
            }, (err, info) => {
                if (err) {
                    func.output("Ошибка подключения к прокси!", undefined, "red", "bold");
                    return;
                }
                func.output('Соединение с прокси установлено.', undefined, "white", "bold");
                client.setSocket(info.socket);
                client.emit('connect');
            });
        };


    }
    let bot = mineflayer.createBot({
        host: server,
        port: port,
        username: username,
        version: version,
        connect: connect,
        hideErrors: true
    });
    bot.smart = {
        vars: {
            work: true,

            settings: {
                username: username,
                server: server,
                version: version,
                port: port,
                proxy: proxy,
                anarchy: anarchy,
                script: script,
                cdms: 7000
            },

            money: {
                balance: 0,
                clan: 0,
                allTime: 0
            },

            default: {
                clickerAttack: false,
                autoJump: false,
                minClanInvest: 50000000
            },

            script: {
                cocoa_beans: {
                    clicker: {
                        dig: false,
                        place: false
                    }
                },
                auto_repair: false,

                threeBot: {
                    clanInvest: 0,
                    anarchyRepait: anarchyRepait
                },
                nether_wart: {
                    dig_clicker: false,
                    place_clicker: false,
                    last_coords_break: -10000,
                    last_coords_place: -10000,
                    restack: false
                }
            }
        }
    }
    func.output("Бот с ником " + username + " успешно подключен к серверу", undefined, "white", "bold")

    bot.once("spawn", () => {
        func.output("Выполнение скрипта начато у бота с ником " + username + "\n\n", undefined, "white", "bold")

        startEvent.allScripts(bot, script).catch((e) => {restart.default(bot, e)})
    })


    return bot
}

export default connect;
