const express = require("express")
const router = express.Router()
const HighScore = require("../models/highScore.js")



router.post("/add", (req, res)=>{
    const highScore = new HighScore(req.body)
    highScore.save().then((doc)=>{
       res.send(`The following was added ${doc}`)
   }).catch(()=>res.status(500).end())
           
})

router.get("/getAll", (req, res)=>{
    HighScore.find().then(docs=>res.send(docs))
    .catch(()=>res.status(500))
           
})


module.exports = router