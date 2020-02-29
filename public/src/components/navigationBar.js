import axios from "../axios.js"
import profileImage from "../assets/images/login.jpg" 

const imgTag = document.querySelector("#profile-image")
imgTag.src =  profileImage


const register = document.querySelector("#register")
const login = document.querySelector("#login")
const profile = document.querySelector("#profile")
const game =  document.querySelector("#game")
const highscore =  document.querySelector("#highscore")


const displayRegister = document.querySelector("#display-register")
const displayLogin = document.querySelector("#display-login")
const displayGame =  document.querySelector("#display-game")
const displayhighscores =  document.querySelector("#display-highscores")
const logout = document.querySelector("#logout")
const displayProfile = document.querySelector("#display-profile")



 displayGame.addEventListener("click", ()=>{
    register.style.display = "none"
    login.style.display = "none"
    game.style.display = "block"
    highscore.style.display = "none"
    profile.style.display = "none"

    displayRegister.style.textDecoration = "none"
    displayLogin.style.textDecoration = "none"
    displayGame.style.textDecoration = "underline"
    displayhighscores.style.textDecoration = "none"
        


 })

displayhighscores.addEventListener("click", ()=>{
    register.style.display = "none"
    login.style.display = "none"
        game.style.display = "none"
        highscore.style.display = "block"
        profile.style.display = "none"

        displayRegister.style.textDecoration = "none"
        displayLogin.style.textDecoration = "none"
        displayGame.style.textDecoration = "none"
        displayhighscores.style.textDecoration = "underline"
        
    })


    displayRegister.addEventListener("click",()=>{
    register.style.display = "block"
    login.style.display = "none"
    game.style.display = "none"
    highscore.style.display = "none"
    profile.style.display = "none"

    displayRegister.style.textDecoration = "underline"
    displayLogin.style.textDecoration = "none"
    displayGame.style.textDecoration = "none"
    displayhighscores.style.textDecoration = "none"
        
    })

displayLogin.addEventListener("click",()=>{
    register.style.display = "none"
    login.style.display = "block"
    game.style.display = "none"
    highscore.style.display = "none"
    profile.style.display = "none"
    displayRegister.style.textDecoration = "none"
    displayLogin.style.textDecoration = "underline"
    displayGame.style.textDecoration = "none"
    displayhighscores.style.textDecoration = "none"
        
})

displayProfile.addEventListener("click",()=>{
    register.style.display = "none"
    login.style.display = "none"
    game.style.display = "none"
    highscore.style.display = "none"
    profile.style.display = "block"
})


logout.addEventListener("click",()=>{
    axios.get("user/logout").then(()=>{
        profile.style.display = "none"
        register.style.display = "block"
        login.style.display = "none"
        profileDropdown.style.display = "none"
        registerButton.style.visibility = "visible"
        loginButton.style.visibility = "visible"
        
    })

})



