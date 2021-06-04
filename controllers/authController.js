//  *---IMPORTS JWT---*
const jwt = require('jsonwebtoken');
const verify = require("../middlewares/authentication");

class autoController{
    async create(req,res){
        try {
            //SIMPLE USER
            if(req.body.user == "luixs" && req.body.password == "123"){
                let id = 44;
                let role = "user";
                const token = jwt.sign({id: id, role: role}, process.env.ACCESS_SECRET,{
                    expiresIn: 1500
                });
                res.status(200).json({
                    auth: true,
                    token: token
                })
            }//ADMIN USER
            else if(req.body.user == "admin" && req.body.password == "admin"){
                let id = 88;
                let role="admin";
                const token = jwt.sign({id: id, role: role}, process.env.ACCESS_SECRET,{
                    expiresIn: 1500
                });
                res.status(200).json({
                    auth: true,
                    token: token
                })
            }else{
                res.status(401).json({message: "User not authorized, try a new one"})
            }

        } catch (error) {
            res.status(400).json({erro: error.message})            
        }
    }
}

module.exports = new autoController();