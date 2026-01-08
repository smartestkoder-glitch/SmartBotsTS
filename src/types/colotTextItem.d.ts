export interface colorText {
    color?: {
        type: 'string' | "byte",
        value: string
    },
    underlined?: {
        type: 'byte' | 'string',
        value: number
    },
    text?: {
        type: 'string' | "byte",
        value: string
    },
    bold?: {
        type: 'byte' | 'string',
        value: number
    },
    strikethrough?: {
        type: 'byte' | 'string',
        value: number
    },
    obfuscated?: {
        type: 'byte' | 'string',
        value: number
    },
    italic?: {
        type: 'byte' | 'string',
        value: number
    }
}