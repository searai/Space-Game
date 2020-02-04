const express = require("express")
const path = require("path")
require("./dbconnection.js")
require('dotenv').config()
const highScoreRoutes = require("./controller/highScoreRoutes.js")

const server = express()
server.use(express.json())
server.use(express.static(path.join(__dirname, "public")))
server.use("/highScore", highScoreRoutes)

if(process.env.NODE_ENV == "development"){
    server.use((req, res, next)=>{
        res.header("Access-Control-Allow-Origin", "*")
        next()
    })
}

const port = process.env.PORT

server.get("/data", (req, res) =>{
    res.send(JSON.stringify({msg: "hello"}))
})

server.listen(port,()=>{
  console.log(`server started on port ${port}`)
})

