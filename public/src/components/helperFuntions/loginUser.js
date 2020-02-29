const profileUserName = document.querySelector("#profile-username")
const profileEmail = document.querySelector("#profile-email")
const profile = document.querySelector("#profile")
const profileDropdown = document.querySelector("#profile-dropdown")
const register = document.querySelector("#register")
const login = document.querySelector("#login")

function loginUser(userName, email){

    profile.style.display = "block"
    register.style.display = "none"
    login.style.display = "none"
    profileDropdown.style.display = "block"
    profileUserName.value= userName
    profileEmail.value= email

  
}

export default loginUser