const express = require("express")
const router = express.Router()
const HighScore = require("../models/highScore.js")



router.post("/add", (req, res)=>{
    const max = 10
    HighScore.find({},null,{sort:{
        score: -1
    }}).then(scores=>{
        if(scores.length < max){
            const highScore = new HighScore(req.body)
            return highScore.save()
        }else{
            if(req.body.score > scores[scores.length - 1].score){
                scores[scores.length - 1].user = req.body.user
                scores[scores.length - 1].score = req.body.score
                return scores[scores.length - 1].save()
            }
            res.json({added:false})
        }
    })
    .then(()=>res.json({added:true}))
    .catch(()=>res.status(500))

           
})

router.get("/getAll", (req, res)=>{
    HighScore.find({},null,{sort:{
        score: -1
    }}).then(scores=>res.send(scores))
    .catch(()=>res.status(500))
           
})


module.exports = router