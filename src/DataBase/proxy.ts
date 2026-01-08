import {prisma} from "../../lib/prisma.js";


const dbProxy = {

    create: async (proxy :string) => {
        await prisma.proxy.create({
            data: {
                proxy
            }
        })
    }
}

export default dbProxy