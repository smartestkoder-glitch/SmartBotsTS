

export interface BotConfig {
    proxy: string,
    version: string,

    server: string,


    username: string,

    settings?: {
        password?: string | null,
        anarchy?: string | null,
        script?: string | null,
        botId?: number | null
    }
}

