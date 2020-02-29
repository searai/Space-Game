const jwt = require('jsonwebtoken');


function authenticate(req, res, next){
    jwt.verify(req.cookies.token, process.env.SECRET,(error, decoded)=>{
        if(error) return res.status(401).end()
        req.user = decoded
        next()
    });
   
        
}

module.exports = authenticate