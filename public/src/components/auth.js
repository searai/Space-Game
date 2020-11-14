import store from "../store.js"
import axios from "../axios.js"

const profileUserName = document.querySelector("#profile-username")
const profileEmail = document.querySelector("#profile-email")
const profileDropdown = document.querySelector("#profile-dropdown")
const profile = document.querySelector("#profile")
const register = document.querySelector("#register")
const login = document.querySelector("#login")
const game =  document.querySelector("#game")
const displayGame =  document.querySelector("#display-game")
const displayRegister = document.querySelector("#display-register")
const displayLogin = document.querySelector("#display-login")
const authButtons = document.querySelector("#auth-buttons")


export function checkForLoggedInUser(){
    axios.get("/user/checkForLoggedInUser")
    .then(resp=>{
        const user =  resp.data
        if(user) loginUser(user.userName, user.email)

    })
}



export function loginUser(userName, email){
    game.style.display = "block"
    register.style.display = "none"
    login.style.display = "none"
    profileDropdown.style.display = "block"

    displayGame.style.textDecoration = "underline"
    displayRegister.style.textDecoration = "none"
    displayLogin.style.textDecoration = "none"

    authButtons.style.visibility = "hidden"

    profileUserName.value= userName
    profileEmail.value= email

    store.user = userName

    document.querySelectorAll(".scores").forEach(score=>{
        if(score.querySelector(".user").innerHTML = store.user){
            score.style.textDecoration = "underline"
        }
    })

}

export function logoutUser(){
    axios.get("user/logout").then(()=>{
        profileDropdown.style.display = "none"

        authButtons.style.visibility = "visible"

        if(profile.style.display == "block"){
            profile.style.display = "none"
            game.style.display = "block"
            displayGame.style.textDecoration = "underline"

        }
        
        store.user = ""
        
    })
}

