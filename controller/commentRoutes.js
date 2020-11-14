const express = require("express")
const router = express.Router()
const Comment = require("../models/comment.js")
const commentChange = {val:false}
const commentResponses = []


router.get("/getAllComments", async(req, res)=> {
  try{
    comments = await getAllComments()
    res.send(comments)
  }catch(e){
    res.status(500).end()
  }
 
})

router.post("/addComment", (req,res)=>{
    const comment = new Comment({
        author:req.body.author,
        body:req.body.body
    })

    comment.save().then(()=>{
        commentChange = true
        res.status(200).end()
    })
    .catch(()=>res.status(500).end())
})

router.get("/poll",(req, res)=>{
  commentResponse.push(res)
})


function getAllComments(){
  return new Promise((resolve, reject)=>{
      comment.find({})
      .then(comments=>resolve(comments))
      .catch(()=>reject())
  })
}



module.exports = {
  commentChange,
  commentRoutes:router,
  commentResponses,
  getAllComments
  
}
