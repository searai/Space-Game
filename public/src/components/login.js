import axios from "../axios.js"
import validator from "validator"
import loginUser from "./helperFuntions/loginUser.js"

let loginError = false
const loginEmail = document.querySelector("#email-login")
const loginPassword = document.querySelector("#password-login")

const emailErrorLogin =  document.querySelector(".error-email-login")
const emailLoginServerError = document.querySelector(".error-email-login-server")
const passwordLoginServerError = document.querySelector(".error-password-login-server")
const attemptsLoginServerError = document.querySelector(".error-attempts-server")

        
loginEmail.addEventListener("input",()=>{
    emailLoginServerError.style.display = "none"

    if(validator.isEmail(loginEmail.value)){
        emailErrorLogin.style.display = "none"
        loginError = false

    }else{
        emailErrorLogin.style.display = "block"
        loginError= true
    }
})

loginPassword.addEventListener("input",()=>{
    passwordLoginServerError.style.display ="none"
})


document.querySelector(".submit-login").addEventListener("click",()=>{
    if(!loginError){
        axios.post("user/login",{
            email: loginEmail.value,
            password: loginPassword.value
            })
            .then((res)=>{
                loginEmail.value = ""
                loginPassword.value = ""
                loginUser(res.data.userName, res.data.email)
            })
            .catch((e)=>{
                const error = e.response.data
                attemptsLoginServerError.style.display = "none"

                if(error.email){
                    emailLoginServerError.style.display ="block"
                }else if(error.password){
                    passwordLoginServerError.style.display ="block"
                }else{
                    attemptsLoginServerError.style.display = "block"
                }   
            })
    }
})