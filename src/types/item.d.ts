
import "prismarine-item"
import {colorText} from "./colotTextItem";

declare module "prismarine-item" {
    interface Item {
        components?: [
            {
                type?: 'lore',
                data?: {
                    type?: 'compound',
                    value?: {
                        extra?: {
                            type?: "list"
                            value?: {
                                type?: "compound",
                                value?: colorText[]
                            }
                        }
                    }
                }[]
            }
        ]
    }
}

