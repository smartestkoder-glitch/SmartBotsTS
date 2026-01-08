import { createBot } from "mineflayer";
import func from "./function.js";
import restart from "./restart.js";
import startEvent from "./startEvent.js";
import { SocksClient as socks } from "socks";
async function connect(config) {
    func.output("Бот с ником " + config.username + " пытается подключается к серверу...", undefined, "white", "bold");
    const connect = await connectToProxy(config.proxy, config.server);
    let bot = createSmartBot(config, connect);
    addSmartFields(bot, config);
    startEvent.base(bot);
    startEvent.savesEvent(bot);
    func.output("Бот с ником " + config.username + " успешно подключен к серверу", undefined, "white", "bold");
    bot.once("spawn", () => {
        func.output("Выполнение скрипта начато у бота с ником " + config.username + "\n\n", undefined, "white", "bold");
        if (config.settings?.script)
            startEvent.allScripts(bot, config.settings.script).catch((e) => { restart.default(bot, e); });
    });
    return bot;
}
function checkProxy(proxy) {
    if (!proxy) {
        return restart.fatal("Прокси обязателен для запуска бота!");
    }
    const splitProxy = proxy.split(":");
    if (splitProxy.length !== 4) {
        return restart.fatal("Неверно переданы параметры прокси!");
    }
    if (isNaN(Number(splitProxy[1]))) {
        return restart.fatal("Неверно переден параметры прокси!");
    }
}
function splitServer(server) {
    const splitSrv = server.split(":");
    if (splitSrv.length > 2)
        return restart.fatal("Неверно передан параметр сервера!");
    if (splitSrv.length === 1)
        return [splitSrv[0], 25565];
    return [splitSrv[0], splitSrv[1]];
}
async function connectToProxy(proxy, server) {
    checkProxy(proxy);
    const [hostServer, portServer] = splitServer(server);
    const [hostProxy, portProxy, userProxy, passProxy] = proxy.split(":");
    return async (client) => {
        func.output('Попытка подключения к прокси...', "", "white", "bold");
        await socks.createConnection({
            proxy: {
                host: hostProxy,
                port: Number(portProxy),
                type: 5,
                userId: userProxy,
                password: passProxy
            },
            command: 'connect',
            destination: {
                host: hostServer.toString(),
                port: Number(portServer)
            },
        }, (err, info) => {
            if (err || !info) {
                func.output("Ошибка подключения к прокси!", "", "red", "bold");
                return;
            }
            func.output('Соединение с прокси установлено.', "", "white", "bold");
            client.setSocket(info.socket);
            client.emit('connect');
        });
    };
}
function createSmartBot(config, connect) {
    const [host, port] = splitServer(config.server);
    return createBot({
        host: host.toString(),
        port: Number(port),
        username: config.username,
        version: config.version,
        connect: connect,
        hideErrors: true
    });
}
function addSmartFields(bot, config) {
    bot.smart = {
        vars: {
            work: true,
            config: config,
            donate: "",
            captcha: {
                solving: false,
                facing: {}
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
                nether_wart: {
                    dig_clicker: false,
                    place_clicker: false,
                    last_coords_break: -10000,
                    last_coords_place: -10000,
                    restack: false
                },
                autoSell: {
                    lastResellMin: -1,
                    lastResellSec: -1,
                    lastResell: -1,
                    boughtCountItem: -1,
                    needToBuy: false
                }
            }
        }
    };
}
export default connect;
