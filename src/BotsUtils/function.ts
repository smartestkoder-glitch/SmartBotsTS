import { inspect } from 'util';
import { join } from "path";
import { readFileSync, writeFileSync } from "fs";
import chalk from "chalk";

type Color =
    | 'red'
    | 'green'
    | 'yellow'
    | 'blue'
    | 'white'
    | 'gray'
    | 'bold'
    | "black";



const func = {
    delay: (ms :number) :Promise<unknown> => {
        return new Promise(resolve => setTimeout(resolve, ms));
    },

    output: (msg :string, prefix :string = new Date().toLocaleTimeString(), color :Color | undefined | "" = "", shrift :Color | undefined | "" = "") => {
        let text = "[" + prefix + "]" + msg
        if (color) text = chalk[color](text)
        if (shrift) text = chalk[shrift](text)
        console.log(text)
    },

    outputObject: (msg :object) :void => {

        console.log(inspect(msg, {showHidden: false, depth: null, colors: true}))//Бота
    },

    array: {
        sum: (array :Array<number>) => {
            let summa = 0

            for (const el of array) {
                summa += el
            }
            return summa
        }
    },

    number: {
        roundCheck: (num :number) => {
            return num - Math.floor(num) === 0;
        }
    },


    x3gipotenyza: (x1 :number, y1 :number, z1 :number) :number => {
        const x = Math.abs(x1)
        const z = Math.abs(z1)
        const y = Math.abs(y1)


        return Math.sqrt(x1 ** 2 + y1 ** 2 + z1 ** 2)
    },

    writeToProjectFile: (filename :string, content :string) :void => {
        const projectPath = process.cwd()
        const filePath = join(projectPath, filename)

        writeFileSync(filePath, content)
    },

    readToProjectFile: (filename :string) :string  => {
        const projectPath = process.cwd()
        const filePath = join(projectPath, filename)
        return readFileSync(filePath, { encoding: 'utf8', flag: 'r' });

    }
}

export default func