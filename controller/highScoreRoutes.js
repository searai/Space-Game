const express = require("express")
const router = express.Router()
const HighScore = require("../models/highScore.js")
const changeHighScore = {
    value:false
}
const highScoreResponses = []


router.post("/add", (req, res)=>{
    const max = 10
    getAllScores()
    .then(scores=>{
        if(scores.length < max){
            const highScore = new HighScore(req.body)
            return highScore.save()
        }else{
            if(req.body.score > scores[scores.length - 1].score){
                scores[scores.length - 1].user = req.body.user
                scores[scores.length - 1].score = req.body.score
                return scores[scores.length - 1].save()
            }
            res.send({added:false})
        }

    })
    .then(()=>{
        changeHighScore.value = true
        res.send({added:true})
    })
    .catch(()=>res.status(500).end())        
})

router.get("/getAll", (req, res)=>{
    getAllScores()
    .then(scores=>res.send(scores))
    .catch(()=>res.status(500).end())           
})

router.get("/poll",(req, res)=>{
    highScoreResponses.push(res)
})


function getAllScores(){
    return new Promise((resolve, reject)=>{
        HighScore.find({},null,{sort:{
            score: -1
        }}).then(scores=>resolve(scores))
        .catch(()=>reject())
    })
}


module.exports = {
    changeHighScore,
    highScoreRoutes:router,
    highScoreResponses,
    getAllScores
    
}

