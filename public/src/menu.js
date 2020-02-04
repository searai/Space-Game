const game =  document.querySelector("#game")
const highScore =  document.querySelector("#highScore")

document.querySelector("#displayGame").addEventListener("click", ()=>{
    game.style.display = "block"
    highScore.style.display = "none"
})

document.querySelector("#displayHighScores").addEventListener("click", ()=>{
    game.style.display = "none"
    highScore.style.display = "block"
})
