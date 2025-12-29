import util from 'util'
import zapretPrefics from "../Bots settings/outputOptions.js";
import path from "path";
import fs from "fs";
import chalk from "chalk";
const func = {
    delay: (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    },

    output: (msg, prefix = new Date().toLocaleTimeString(), color = false, shrift = false) => {
        let text = "[" + prefix + "]" + msg
        if (color) text = chalk[color](text)
        if (shrift) text = chalk[shrift](text)
        console.log(text)
    },

    outputObject: (msg) => {

        console.log(util.inspect(msg, {showHidden: false, depth: null, colors: true}))//Бота
    },

    array: {
        sum: (array) => {
            let summa = 0

            for (const el of array) {
                summa += el
            }
            return summa
        }
    },

    number: {
        roundCheck: (num) => {
            return num - num.toFixed() === 0;
        }
    },


    x3gipotenyza: (x1, y1, z1) => {
        const x = Math.abs(x1)
        const z = Math.abs(z1)
        const y = Math.abs(y1)


        return Math.sqrt(x1 ** 2 + y1 ** 2 + z1 ** 2)
    },

    writeToProjectFile: (filename, content) => {
        const projectPath = process.cwd()
        const filePath = path.join(projectPath, filename)

        fs.writeFileSync(filePath, content)
    },

    readToProjectFile: (filename) => {
        const projectPath = process.cwd()
        const filePath = path.join(projectPath, filename)
        return fs.readFileSync(filePath, { encoding: 'utf8', flag: 'r' });

    }
}

export default func