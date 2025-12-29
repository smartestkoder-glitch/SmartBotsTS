import SmartDB from "databaseapismartest";

export async function connectDB(database) {
    const pool = new SmartDB("103.88.241.137", 5432, "smartest", "sdfghjklwqazx", database)
    await pool.connect()
    return pool
}