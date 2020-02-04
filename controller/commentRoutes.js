const express = require("express")
const path = require("path")
require("./dbconnection.js")
const Comment = require("./models/comment.js")
const change = {val:false}
const responseArray = []
require("./longPolling.js")(change, responseArray)


const server = express()
server.use(express.json())
server.use(express.static(path.join(__dirname, "public")))

const port = process.env.PORT || 3000

server.listen(port,()=>{
  console.log(`server started on port ${port}`)
})

server.get("/",(req, res)=>{
  res.sendFile(path.join(__dirname, "public", "index.html"))
})


server.get("/getAllComments", (req, res)=> {
  Comment.find({}).then(docs=>res.send(docs))
  .catch(()=>res.status(500))
 
})

server.post("/addComment", (req,res)=>{
    const comment = new Comment({
        author:req.body.author,
        body:req.body.body
    })

    comment.save().then(()=>{
        change.val = true
        res.status(200).end()
    })
    .catch(()=>res.status(500).end())
})


server.get("/longPolling",(req, res)=>{
  res.setTimeout(1*60*60*1000,()=>{
    res.status(408).end()
   })
   responseArray.push(res)

})


