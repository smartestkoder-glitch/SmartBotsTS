
import 'mineflayer';
import {createBot} from "mineflayer";
import {Donate} from "./donate";
import {Sharp} from "sharp";
import {BotConfig} from "./botConfig";

declare module 'mineflayer' {
    interface Bot {



        smart: {
            vars: {
                work: boolean,

                config: BotConfig,

                donate: Donate,

                captcha: {
                    solving: boolean,
                    facing: Record<string, Sharp>
                },

                money?: {
                    balance?: number,
                    clan?: number,
                    allTime?: number,
                    autoClan?: boolean
                },

                default?: {
                    clickerAttack?: boolean,
                    autoJump?: boolean,
                    minClanInvest?: number
                },

                script?: {
                    cocoa_beans?: {
                        clicker?: {
                            dig?: boolean,
                            place?: boolean,
                        }
                    },
                    auto_repair?: boolean,

                    threeBot?: {
                        clanInvest?: number,
                        anarchyRepait?: string
                    },
                    nether_wart?: {
                        dig_clicker?: boolean,
                        place_clicker?: boolean,
                        last_coords_break?: number,
                        last_coords_place?: number,
                        restack?: boolean
                    },

                    autoSell?: {
                        lastResellMin?: number,
                        lastResellSec?: number,
                        lastResell?: number,
                        boughtCountItem?: number,
                        needToBuy?: boolean,
                    }
                }
            }
        }
    }
}
