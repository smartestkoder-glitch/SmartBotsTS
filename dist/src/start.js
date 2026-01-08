import connectFromDB from "./BotsUtils/connectFromDB.js";
const args = process.argv;
if (args.length !== 3)
    throw new Error("Неверно переданы аргументы!");
if (isNaN(Number(args[2])))
    throw new Error("Неверно переданы аргументы!");
connectFromDB(Number(args[2]));
