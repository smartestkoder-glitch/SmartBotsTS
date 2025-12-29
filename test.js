import func from "./Bots utils/function.js"

const text = func.readToProjectFile("test.txt")
console.log(text.replaceAll(" ", "").split("хуй").length)