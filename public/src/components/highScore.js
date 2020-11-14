import axios from "../axios.js"
import store from "../store.js"
import serverError from "./internalSeverError.js"

export function updateScores(){
    axios.get("/highscore/getAll")
    .then(scores=>updateDom(scores.data))
    .catch(serverError)    

}

export function pollHighScores(){
    axios.get("/highscore/poll")
    .then(scores=>{
        updateDom(scores.data)
        pollHighScores()
    }).catch(serverError)
}

export function postScore(score){

    return new Promise((resolve, reject)=>{
        axios.post("/highscore/add",score)
        .then((resp)=>resolve(resp.data))
        .catch(reject)
    })
  
    
}


function updateDom(scores){
    const highScoreContainer = document.querySelector("#score-container")
    const templateHighScore = document.querySelector("#highscore-template")
    let highScoreNode

    highScoreContainer.innerHTML = ""
    scores.forEach((score, index)=>{
        highScoreNode = templateHighScore.content.cloneNode(true)
        highScoreNode.querySelector(".ranking").innerHTML = index + 1
        highScoreNode.querySelector(".user").innerHTML = score.user
        highScoreNode.querySelector(".score").innerHTML = score.score

        if(highScoreNode.querySelector(".user").innerHTML == store.user){
            highScoreNode.querySelector(".scores").style.textDecoration = "underline"
        }

        highScoreContainer.appendChild(highScoreNode)

    })
    
}

