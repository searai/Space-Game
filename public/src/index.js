import "./scss/index.scss"

import "./components/navigationBar.js"
import "./components/login.js"
import "./components/register.js"
import "./game.js"
import {getAllScores} from "./components/highScore.js"

function created(){

    // getAllScores().then(scores=>{
    //     scores.forEach(score=>console.log(score))
    // })
    
    const highScoreContainer = document.querySelector("#score-container")
    const templateHighScore = document.querySelector("#highscore-template")
    const highScoreNode = templateHighScore.content.cloneNode(true)
    highScoreNode.querySelector(".ranking").innerHTML = 1
    highScoreNode.querySelector(".user").innerHTML = "John"
    highScoreNode.querySelector(".score").innerHTML = 100
    highScoreContainer.appendChild(highScoreNode)
}

created()