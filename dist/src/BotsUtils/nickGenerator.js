const nickGenerator = {
    parts: {
        first: [
            "Xto", "", "Ya_Ne", "Ver", "Hog", "Map", "Smar", "Omar", "Koper", "Cerip", "228", "228_", "Qupor", "Vlion", "Maro", "Nedug", "Ust", "frik_", "_Serip", "Jok", "Ciker", "Xeru", "loli", "pefi", "RoFe"
        ],
        second: [
            "Rider", "wolg", "mer", "der", "lok", "bim", "deh", "pic", "rek", "ceq", "mes", "kev", "cip", "Coper", "Neon", "ser", "ner", "mir", "ger", "dub", "pos", "nim", "non", "lux", "pyt", "qud", "das", "zet", "zer", "lof"
        ],
        third: [
            "_228", "67", "_67", "228", "1337", "3000", "zxc", "_zxc", "_", "loj", "_WW", "", "Fan", "Skill", "_pro", "Ped", "_krut", "er", "dist", "nist", "gist", "gost", "pol", "gert", "cuk", "sel", "bel", "lol", "_LOL", "_KEK", "gip", "__", "fifi", "sed", "krud", "slid", "slud", "sas", "swer", "swad", "swen", "swop", "soad", "soax", "seug"
        ]
    },
    getCountVariant: () => {
        return nickGenerator.parts.second.length * nickGenerator.parts.first.length * nickGenerator.parts.third.length;
    },
    generator: () => {
        const randomFirst = nickGenerator.parts.first[Math.floor(nickGenerator.parts.first.length * Math.random())];
        const randomSecond = nickGenerator.parts.second[Math.floor(nickGenerator.parts.second.length * Math.random())];
        const randomThird = nickGenerator.parts.third[Math.floor(nickGenerator.parts.third.length * Math.random())];
        return randomFirst + randomSecond + randomThird;
    },
    generatorV2: (mask) => {
        const sogl = "qrtpsdfghklzxcvbnm".split("");
        const glas = "euioa".split("");
        const numbers = "1234567890".split("");
        let answer = "";
        for (const sym of mask.split("")) {
            const randG = glas[Math.floor(glas.length * Math.random())];
            const randS = sogl[Math.floor(sogl.length * Math.random())];
            if (sym === "s")
                answer += randS;
            if (sym === "g")
                answer += randG;
        }
        return answer;
    },
    generatorV3: () => {
        const randomFirst = nickGenerator.parts.first[Math.floor(nickGenerator.parts.first.length * Math.random())];
        const randomSecond = nickGenerator.generatorV2("sggs");
        const randomThird = nickGenerator.parts.third[Math.floor(nickGenerator.parts.third.length * Math.random())];
        return randomFirst + randomSecond + randomThird;
    },
};
export default nickGenerator;
