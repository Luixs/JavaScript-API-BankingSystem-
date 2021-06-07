//  *---IMPORTS JWT---*
const jwt = require('jsonwebtoken');
const verificar = require('../middlewares/authentication');

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
            res.status(400).json({erro: error.message});
        }
    }
    async destroyAuth(req,res){
        try {
            res.status(200).json({
                auth: false,
                key: null
            })
        } catch (error) {
            res.status(400).json({erro: error.message});
        }
    }
    async testAdmin(req,res){
        try {
            res.status(200).json({message: "Welcome, ADMIN is WORKING!!"});
        } catch (error) {
            res.status(400).json({erro: error.message});
        }
    }
    async testUser(req,res){
        try {
            await res.status(200).json({message: "Welcome, USER is Working!!!"})            
        } catch (error) {
            res.status(400).json({erro: error.message})
        }
    }
}

module.exports = new autoController();