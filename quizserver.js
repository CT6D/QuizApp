const express = require("express")
const app = express();
const path = require("path")
const Datastore = require("nedb")
app.listen(4000, () => console.log('hello world'))
app.use(express.static("public"))
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json({ limit: "1mb" }))


const database = new Datastore("database.db")
database.loadDatabase()

app.post("/api", (request, response) => {

    const data = request.body

    database.insert(data)
    response.json({
        status: "success",
 


    })



})

app.get("/api", (request, response) => {
    database.find({}, (error, data) => {

        response.json(data)

        if (error) {
            console.log(error)
        }
    })
})