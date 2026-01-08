import { connectDB } from "../../DataBase/connect.js";
const dataSell = {
    /**
     * Получить конфиг для предмета
     * @param pool
     * @param name
     * @returns {Promise<*>}
     */
    get: async (pool, name) => {
        return await pool.getOne(`SELECT * FROM auto_sell_config WHERE name = ${name}`);
    }
};
const pool = await connectDB("FarmBots");
console.log(await dataSell.get(pool, 'potion'));
export default dataSell;
