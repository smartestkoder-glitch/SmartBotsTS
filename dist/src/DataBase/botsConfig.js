import { prisma } from "../../lib/prisma.js";
const dbBotsConfig = {
    create: async (botConfig) => {
        await prisma.botsConfig.create({
            data: {
                nick: botConfig.username,
                server: botConfig.server,
                version: botConfig.version,
                settings: {
                    create: {
                        password: botConfig.settings?.password,
                        anarchy: botConfig.settings?.anarchy,
                        Scripts: {
                            connect: {
                                name: botConfig.settings?.script || "Nothing"
                            }
                        },
                    }
                },
                Proxy: {
                    connect: {
                        proxy: botConfig.proxy
                    }
                }
            }
        });
    },
    get: async (botId) => {
        const res = await prisma.botsConfig.findFirst({
            where: {
                id: botId
            },
            include: {
                kicks: true,
                bans: true,
                deaths: true,
                chatMessages: true,
                DMBuys: true,
                Proxy: true,
                settings: {
                    include: {
                        Scripts: true
                    }
                }
            }
        });
        return res;
    }
};
export default dbBotsConfig;
