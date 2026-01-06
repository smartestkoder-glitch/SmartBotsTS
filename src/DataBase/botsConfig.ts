import {prisma} from "../lib/prisma.js";

const dbBotsConfig = {

    create: async (nick, server, script, settings = {}) => {
        await prisma.botsConfig.create({
            data: {
                nick,
                server,
                script,
                settings
            }
        })
    }

}