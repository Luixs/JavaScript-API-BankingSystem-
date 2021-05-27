/*----IMPORT------*/
const jwt = require('jsonwebtoken');

let verificar = function verificationJwt(req,res,next){
    const token = req.headers['x-acess-token'];
    
    if(!token) res.status(401).json({message:"User not Authorizaded!!"})//DEFINIR MENSAGEM

    jwt.verify(token, process.env.ACCESS_SECRET, function(error, decoded){
        if(error) res.status(401).json({});//DEFINIR MENSAGEM
        req.userID = decoded;
        next();
    })
}

module.exports = verificar;