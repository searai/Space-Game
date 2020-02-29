const express = require("express")
const router = express.Router()
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt")
const User = require("../models/user.js")
const auth = require("../authenticate.js")



router.post("/login",(req, res)=>{
    const error = {
        email: false,
        password: false,
        attempts: false
    }
    User.findOne({email : req.body.email})
    .then((user)=>{
        if(!user){
            error.email = true
            return res.status(400).json(error)
        }

        if(Date.now() - user.startTime > 2*60*1000){
            user.loginAttempts = 0
            user.startTime = Date.now()
            return user.save()
        }

        if(user.loginAttempts < 5){
            user.loginAttempts += 1
            return user.save()
            
        }else{
             error.attempts = true
             res.status(400).json(error)
        }

    })
    .then(async(user)=>{
        try{
            const match = await bcrypt.compare(req.body.password, user.password);
            if(match){
                return signToken(user, res)
            }
            
            error.password = true
            res.status(400).json(error)
          

        }catch(e){
                throw new Error()
        }
    })
    .catch(()=>res.status(500))


})



router.post("/register",(req, res)=>{
    
    const error = {
        userName: false,
        email: false
    }

    User.findOne({userName:req.body.userName}).then((user)=>{
        if(user){
             error.userName = true
        }
        return User.findOne({email:req.body.email})

    })
    .then(user=>{
        if(user){
            error.email = true
        }
       if(error.userName|| error.email){
           return res.status(400).json(error)
        }
        return bcrypt.hash(req.body.password, 10)

    })
    .then(hashPassword=>{
        const user = new User({ ...req.body, password : hashPassword})
        return user.save()

    }).then((user)=>{
        signToken(user, res)
    })
    .catch(()=>res.status(500))

})




function signToken(user, res){
    jwt.sign({
        userName:user.userName,
        email:user.email
       }, process.env.SECRET, (error, token)=>{
        if(error) return res.status(401).end()
        res
        .cookie("token",token,{
            httpOnly: (process.env.NODE_ENV == "production")? true : false,
            secure: (process.env.NODE_ENV == "production")? true : false,
        })
        .json({
            userName:user.userName,
            email:user.email
           })
    })

}

router.get("/checkForLoggedInUser", auth ,(req, res)=>{
    res.json(req.user)
})


router.get("/locked", auth, (req, res)=>{
    res.send("you made it")
})


router.get("/logout",(req, res)=>{
    res.clearCookie('token').end()
})



module.exports = router