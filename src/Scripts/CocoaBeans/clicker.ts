import func from '../../Bots utils/function.js'
import digCB from './dig.js'
import placeCB from './place.js'

const clickerCB = {
    clickerEvent: async (bot, ms = 10) => {
        if (bot.smart.vars.script.cocoa_beans.clicker.dig) {
            //await digCB.digAllKaka(bot, ms)
            await digCB.digAllKakaNew(bot, ms).catch(err => {})
        }
        if (bot.smart.vars.script.cocoa_beans.clicker.place) {
            await placeCB.placeAllNew(bot, ms).catch(err => {})
        }
        setTimeout(clickerCB.clickerEvent, 10, bot)
    },
    dig: {
        start: (bot) => {
            bot.smart.vars.script.cocoa_beans.clicker.dig = true
        },
        stop: (bot) => {
            bot.smart.vars.script.cocoa_beans.clicker.dig = false

        },
    },
    place: {
        start: (bot) => {
            bot.smart.vars.script.cocoa_beans.clicker.place = true
        },
        stop: (bot) => {
            bot.smart.vars.script.cocoa_beans.clicker.place = false

        },
    }
}


export default clickerCB