import func from './function.js';
import event from './event.js';
const translator = {
    chat: (bot, status) => {
        event.message(bot, (msg) => {
            if (status) {
                func.output(msg.toAnsi(), "ЧАТ");
            }
        });
    },
    spawn: (bot, text) => {
        event.spawn(bot, () => {
            func.output(text, "СПАВН");
        });
    },
    death: (bot, text) => {
        event.death(bot, () => {
            func.output(text, "СМЕРТЬ");
        });
    },
    end: (bot, text) => {
        event.end(bot, () => {
            func.output(text, "ОТКЛЮЧЕНИЕ");
        });
    },
    kick: (bot, text) => {
        event.kicked(bot, (reason) => {
            func.output(text + `
Причина:
${reason}`, "КИК");
        });
    },
};
export default translator;
