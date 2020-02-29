const express = require("express")
const path = require("path")
const cookieParser = require('cookie-parser')
require('dotenv').config()
require("./dbconnection.js")
const highScoreRoutes = require("./controller/highScoreRoutes.js")
const userRoutes = require("./controller/userRoutes.js")

const server = express()

if(process.env.NODE_ENV == "development"){
  server.use((req, res, next)=>{
      res.header('Access-Control-Allow-Origin', req.headers.origin);
      res.header('Access-Control-Allow-Headers',"Content-Type");
      next()
  })
}
server.use(express.json())
server.use(cookieParser())
server.use(express.static(path.join(__dirname, "public")))
server.use("/highscore", highScoreRoutes)
server.use("/user", userRoutes)

const port = process.env.PORT


server.listen(port,()=>{
  console.log(`server started on port ${port}`)
})

