import { inspect } from 'util';
import { join } from "path";
import { readFileSync, writeFileSync } from "fs";
import chalk from "chalk";
const func = {
    delay: (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    },
    output: (msg, prefix = new Date().toLocaleTimeString(), color = "", shrift = "") => {
        if (!prefix)
            prefix = new Date().toLocaleTimeString();
        let text = "[" + prefix + "]" + msg;
        if (color)
            text = chalk[color](text);
        if (shrift)
            text = chalk[shrift](text);
        console.log(text);
    },
    outputObject: (msg) => {
        console.log(inspect(msg, { showHidden: false, depth: null, colors: true })); //Бота
    },
    array: {
        sum: (array) => {
            let summa = 0;
            for (const el of array) {
                summa += el;
            }
            return summa;
        }
    },
    number: {
        roundCheck: (num) => {
            return num - Math.floor(num) === 0;
        }
    },
    x3gipotenyza: (x1, y1, z1) => {
        const x = Math.abs(x1);
        const z = Math.abs(z1);
        const y = Math.abs(y1);
        return Math.sqrt(x1 ** 2 + y1 ** 2 + z1 ** 2);
    },
    writeToProjectFile: (filename, content) => {
        const projectPath = process.cwd();
        const filePath = join(projectPath, filename);
        writeFileSync(filePath, content);
    },
    readToProjectFile: (filename) => {
        const projectPath = process.cwd();
        const filePath = join(projectPath, filename);
        return readFileSync(filePath, { encoding: 'utf8', flag: 'r' });
    }
};
export default func;
