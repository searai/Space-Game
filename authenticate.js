const jwt = require('jsonwebtoken');


function authenticate(req, res, next){
    jwt.verify(req.cookies.token, process.env.SECRET, error=>{
        if(error) return res.status(401).end()
        
        next()
    });
   
        
}

module.exports = authenticate