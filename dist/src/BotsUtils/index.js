import FunTimeUtils from "./FuntimeUtils/index.js";
import attack from "./attack.js";
import connect from "./connect.js";
import digBlock from "./digBlock.js";
import effects from "./effects.js";
import event from "./event.js";
import func from "./function.js";
import inventory from "./inventory.js";
import item from "./item.js";
import look from "./look.js";
import move from "./move.js";
import nickGenerator from "./nickGenerator.js";
import placeBlock from "./placeBlock.js";
import restart from "./restart.js";
import rubbish from "./rubbish.js";
import saveEvents from "./saveEvents.js";
import startEvent from "./startEvent.js";
import translator from "./translator.js";
import use from "./use.js";
import window from "./window.js";
import connectFromDB from "./connectFromDB.js";
const botsUtils = {
    FunTimeUtils: FunTimeUtils,
    attack: attack,
    connect: connect,
    connectFromDB: connectFromDB,
    digBlock: digBlock,
    effects: effects,
    event: event,
    func: func,
    inventory: inventory,
    item: item,
    look: look,
    move: move,
    nickGenerator: nickGenerator,
    placeBlock: placeBlock,
    restart: restart,
    rubbish: rubbish,
    saveEvents: saveEvents,
    startEvent: startEvent,
    translator: translator,
    use: use,
    window: window
};
export default botsUtils;
