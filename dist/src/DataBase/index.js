import autoDMParser from "./autoDMParser.js";
import bans from "./bans.js";
import botsConfig from "./botsConfig.js";
import chatMessages from "./chatMessages.js";
import deaths from "./deaths.js";
import DMBuys from "./DMBuys.js";
import kicks from "./kicks.js";
import priceConfig from "./priceConfig.js";
import proxy from "./proxy.js";
const dbFunc = {
    autoDMParser: autoDMParser,
    bans: bans,
    batsConfig: botsConfig,
    chatMessages: chatMessages,
    deaths: deaths,
    DMBuys: DMBuys,
    kicks: kicks,
    priceConfig: priceConfig,
    proxy: proxy
};
export default dbFunc;
