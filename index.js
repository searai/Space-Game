const express = require("express")
const path = require("path")
const cookieParser = require('cookie-parser')
require('dotenv').config()
require("./dbconnection.js")
const {highScoreRoutes, changeHighScore, highScoreResponses} = require("./controller/highScoreRoutes.js")
const {commentRoutes, commentChange, commentResponses} = require("./controller/commentRoutes.js")
const userRoutes = require("./controller/userRoutes.js")
require("./polling.js")(changeHighScore, highScoreResponses,commentChange, commentResponses)


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
server.use(express.static(path.join(__dirname, "public", "dist")))
server.use("/highscore", highScoreRoutes)
server.use("/comments", commentRoutes)
server.use("/user", userRoutes)
server.get("/", (req, res)=>{
  res.sendFile(path.join(__dirname, "public","dist","index.html")) 
})



const port = process.env.PORT

server.listen(port,()=>{
  console.log(`server started on port ${port}`)
})

