import { prisma } from "../../lib/prisma.js";
const dbProxy = {
    create: async (proxy) => {
        await prisma.proxy.create({
            data: {
                proxy
            }
        });
    }
};
export default dbProxy;
