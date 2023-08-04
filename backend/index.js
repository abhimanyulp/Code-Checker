const express = require("express")
const cors = require("cors")

const { queryRouter } = require("./routes/query.routes")

const app = express()
app.use(cors())
app.use(express.json())


app.get("/", (req,res) => {
    res.status(200).send({"msg":"Welcome Home"})
})

app.use("/query", queryRouter)


const Port = 8080
app.listen(Port, () => {
    console.log(`Server running @ ${Port} port`)
})