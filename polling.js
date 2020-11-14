const {getAllScores} = require("./controller/highScoreRoutes.js")
const {getAllComments} = require("./controller/commentRoutes.js")

function checkForUpdates(changeHighScore, highScoreResponses, commentChange, commentResponses){
 
    setInterval(async()=>{
        if(changeHighScore.value){ 

            try{
                const scores = await getAllScores()
                highScoreResponses.forEach(res=>res.send(scores))
            }catch(e){
                highScoreResponses.forEach(res=>res.status(500).end())
            } 

            changeHighScore.value = false
            highScoreResponses.length = 0 

            try{
                const comments = await getAllComments()
                commentResponses.forEach(res=>res.send(comments))
            }catch(e){
                commentResponses.forEach(res=>res.status(500).end())
            } 

            commentChange.value = false
            commentResponses.length = 0 


        }
              
    }, 5000)

}

module.exports = checkForUpdates