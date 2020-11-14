const express = require("express")
const router = express.Router()
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt")
const User = require("../models/user.js")
const auth = require("../authenticate.js")




router.post("/login",async(req, res)=>{
    const error = {
        email: false,
        password: false,
        attempts: false
    }

    try{
        const user = await User.findOne({email : req.body.email})

        if(!user){
            error.email = true
            return res.status(400).send(error)
        }
  
        if(Date.now() - user.startTime > 2*60*1000){
            user.loginAttempts = 0
            user.startTime = Date.now()
            await user.save()
        }
    
        if(user.attempts >= 5){
            error.attempts = true
            return res.status(400).send(error)
        }
    
        const match = await bcrypt.compare(req.body.password, user.password)
    
        if(match){
            return signToken(user, res)
        }
        
        user.loginAttempts += 1
        await user.save()

        error.password = true
        res.status(400).send(error)


    }catch(e){
        return res.status(500).end()
    }
            

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
        .send({
            userName:user.userName,
            email:user.email
           })
    })

}

router.get("/checkForLoggedInUser", (req, res)=>{
    jwt.verify(req.cookies.token, process.env.SECRET, (error, user)=>{
        if(error) return res.send(null)

        res.send(user)

        
    });
})


router.get("/locked", auth, (req, res)=>{
    res.send("you made it")
})


router.get("/logout",(req, res)=>{
    res.clearCookie('token').end()
})



module.exports = router