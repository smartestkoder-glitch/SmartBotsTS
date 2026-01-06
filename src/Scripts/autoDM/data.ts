import dbAPI from "smartdbapi";
import connect from "smartdbapi/connect.js"

const pool = connect("103.88.241.137", "FarmBots")

let data = await pool.query(`SELECT * FROM dmparse WHERE id = 960`)
data = JSON.parse(data.rows)
console.log(data)
for (const i of data[0]) {

}