/*----IMPORT------*/
const jwt = require('jsonwebtoken');

let verificar = function verificationJwt(req,res,next){

    /* ---- BEARER VERIFICATION --- */
    let token = req.headers['authorization'];
    const newToken = token.split(" ");
    token = newToken[1];
    
    if(!token) res.status(401).json({message:"User not Authorizaded!!"})//DEFINIR MENSAGEM

    jwt.verify(token, process.env.ACCESS_SECRET, function(error, decoded){
        if(error) res.status(401).json({});//DEFINIR MENSAGEM
        req.userID = decoded;
        next();
    })
}

module.exports = verificar;