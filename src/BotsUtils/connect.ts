import { createBot } from "mineflayer"
import func from "./function.js"
import restart from "./FuntimeUtils/restart"
import startEvent from "./startEvent.js"

import {SocksClient as socks} from "socks";
import {SocksClientEstablishedEvent} from "socks/typings/common/constants";


import type { Client } from "minecraft-protocol";

import {BotConfig} from "../types/botConfig";


async function connect(config :BotConfig) {




    if (!config.username) {
        func.output("Произошла поытка запустить бота без username!", "", "red", "bold")
        return restart.fatal()
    }

    if (!config.version) {
        func.output("Произошла поытка запустить бота без version!", "", "red", "bold")
        return restart.fatal()
    }

    if (!config.server) {
        func.output("Произошла поытка запустить бота без server!", "", "red", "bold")
        return restart.fatal()
    }

    let connect

    func.output("Бот с ником " + config.username + " пытается подключается к серверу...", undefined, "white", "bold")
    if (config.proxy) {
        const proxyOpt = config.proxy.split(":");

        if (proxyOpt.length !== 4 || isNaN(Number(proxyOpt[1]))) {
            func.output("Неверно передан параметр прокси!", "", "red", "bold")
            return restart.fatal()
        }

        connect = async (client :Client) => {
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
                    host: config.server || "localhost",
                    port: config.port || 25565
                },
            }, (err :Error | null, info?:SocksClientEstablishedEvent | undefined) => {
                if (err || !info) {
                    func.output("Ошибка подключения к прокси!", undefined, "red", "bold");
                    return;
                }
                func.output('Соединение с прокси установлено.', undefined, "white", "bold");
                client.setSocket(info.socket);
                client.emit('connect');
            });
        };


    }
    let bot = createBot({
        host: config.server,
        port: config.port,
        username: config.username,
        version: config.version,
        connect: connect,
        hideErrors: true
    });

    bot.smart = {
        vars: {
            work: true,

            settings: {
                username: config.username,
                server: config.server,
                password: config.password,
                version: config.version,
                port: config.port,
                proxy: config.proxy,
                anarchy: config.anarchy,
                script: config.script,
            },

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
    }

    //Спец вызовы, потом перенести!!!

    //!!!

    func.output("Бот с ником " + config.username + " успешно подключен к серверу", undefined, "white", "bold")

    bot.once("spawn", () => {
        func.output("Выполнение скрипта начато у бота с ником " + config.username + "\n\n", undefined, "white", "bold")

        if (config.script) startEvent.allScripts(bot, config.script).catch((e) => {restart.default(bot, e)})
    })


    return bot
}







export default connect;
