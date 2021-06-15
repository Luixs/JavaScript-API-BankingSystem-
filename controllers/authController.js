//  *---IMPORTS ---*
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const bcrypt = require('bcrypt');

async function isAdmin(User){
    if(User.name == "Administrator"){
        return "admin"
    }
    else{
        return "user"
    }
}

class autoController{
    async create(req,res){
        try {
            let user = req.body.user;
            let password = req.body.password;
            //USING THE DATABASE
            let findUser =  await User.findOne({where:{user: user}});
            //IF DON'T EXIST A USER
            if(findUser ==null){
                return res.status(401).json({Message:"User not found,try a new one"});
            }
            //INVALID PASSOWORD
            else if (!await bcrypt.compare(password, findUser.password)){
                return res.status(401).json({Message:"Invalid Password!!!"});
            }
            else{
                let role = await isAdmin(findUser);
                console.log(role);
            }
            //SIMPLE USER (Modify to get a User from the SQL)
            /*if(req.body.user == "luixs" && req.body.password == "123"){
                let id = 44;
                let role = "user";
                const token = jwt.sign({id: id, role: role}, process.env.ACCESS_SECRET,{
                    expiresIn: 300 //expire in 5Min
                });
                res.status(200).json({
                    auth: true,
                    token: token
                })
            }//ADMIN USER (Modify to get a ADMIN from the SQL)
            else if(req.body.user == "admin" && req.body.password == "admin"){
                let id = 88;
                let role="admin";
                const token = jwt.sign({id: id, role: role}, process.env.ACCESS_SECRET,{
                    expiresIn: 300 //expire in 5Min
                });
                res.status(200).json({
                    auth: true,
                    token: token
                })
            }else{
                res.status(401).json({message: "User not authorized, try a new one"})
            }*/

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