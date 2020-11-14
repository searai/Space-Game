const register = document.querySelector("#register")
const login = document.querySelector("#login")
const profile = document.querySelector("#profile")
const game =  document.querySelector("#game")
const highscore =  document.querySelector("#highscore")
const nav =  document.querySelector("nav")
const internalSeverError =  document.querySelector("#internal-server-error")

export default function internalServerError(){
    internalSeverError.style.display = "block"

    nav.style.display = "none"
    register.style.display = "none"
    login.style.display = "none"
    profile.style.display = "none"
    game.style.display = "none"
    highscore.style.display = "none"
}