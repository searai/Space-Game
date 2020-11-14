import axios from "../axios.js"
import validator from "validator"
import {loginUser} from "./auth.js"

const registerError = {
    userName: true,
    email: true,
    password: [true, true],
    confirmPassword: false,

}


const username =  document.querySelector("#username")
const userNameError =  document.querySelector(".error-username")
const userNameServerError = document.querySelector(".error-username-server")

username.addEventListener("input", ()=>{
    userNameServerError.style.display = "none"

    if(username.value.length > 6){
        userNameError.style.display = "none"
        registerError.userName = false
    }else{
        userNameError.style.display = "block"
        registerError.userName = true
    }
})

const emailRegister =  document.querySelector("#email-register")
const emailErrorRegister =  document.querySelector(".error-email-register")
const emailRegisterServerError = document.querySelector(".error-email-register-server")

emailRegister.addEventListener("input", ()=>{
    emailRegisterServerError.style.display = "none"
    if(validator.isEmail(emailRegister.value)){
        emailErrorRegister.style.display = "none"
        registerError.email = false

    }else{
        emailErrorRegister.style.display = "block"
        registerError.email = true
    }
})


const passwordRegister =  document.querySelector("#password-register")
const passwordErrorsRegister =  document.querySelectorAll(".error-password-register")

const confirmPassword = document.querySelector("#confirmPassword")
const confirmPasswordError = document.querySelector(".error-confirm-password")

passwordRegister.addEventListener("input", ()=>{
    if(passwordRegister.value.length > 6){
        passwordErrorsRegister[0].style.display = "none"
        registerError.password[0] = false
    }else{
        passwordErrorsRegister[0].style.display = "block"
        registerError.password[0] = true
    }

    
    const resLetter = /[a-z]/i.test(passwordRegister.value)
    const resDigit = /\d/.test(passwordRegister.value)
    if(resDigit && resLetter){
        passwordErrorsRegister[1].style.display = "none"
        registerError.password[1] = false
    }else{
        passwordErrorsRegister[1].style.display = "block"
        registerError.password[1] = true
    }

    if(confirmPassword.value != passwordRegister.value){
        confirmPasswordError.style.display = "block"
        registerError.confirmPassword = true
    }else{
        confirmPasswordError.style.display = "none"
        registerError.confirmPassword  = false
    }
    

})


confirmPassword.addEventListener("input",()=>{
    if(confirmPassword.value != passwordRegister.value){
        confirmPasswordError.style.display = "block"
        registerError.confirmPassword = true
    }else{
        confirmPasswordError.style.display = "none"
        registerError.confirmPassword = false
    }
})

const submitRegister = document.querySelector(".submit-register")
submitRegister.addEventListener("click",()=>{
    if(!registerError.userName  && !registerError.email && !registerError.password[0]
        && !registerError.password[1] && !registerError.confirmPassword){
            axios.post("/user/register",{
                userName: username.value,
                email: emailRegister.value,
                password: passwordRegister.value
            },
            ).then(res=>{
                username.value = ""
                emailRegister.value = ""
                passwordRegister.value = ""
                confirmPassword.value = ""
                loginUser(res.data.userName, res.data.email)
            })
            .catch(e=>{
                    const data = e.response.data
                    if(data.userName){
                        userNameServerError.style.display = "block"
                    }
                    if(data.email){
                        emailRegisterServerError.style.display = "block"
                    }
             })
        }

   
})