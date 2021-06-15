const { User } = require('../models');
//cryptography
const bcrypt = require('bcrypt');


class UserController {
    async getAll(req,res){
        try {
            const allUser = await User.findAll()
            res.status(200).json({Users: allUser})
        } catch (error) {
            res.status(401).json({erro: error.message});
        }
    }
    async create(req,res){
        try {
            var userName = req.body.name;
            var userAlias = req.body.user;
            var userPassword = req.body.password;
            if(userName && userAlias && userPassword){
                //cryptography
                userPassword = await bcrypt.hash(userPassword, 8);
                //continue
                let userDone = {
                    name: userName,
                    user: userAlias,
                    password: userPassword
                }
                console.log(userDone);
                await User.create(userDone);
                res.status(201).json({message: userDone});
            }
            else{
                res.status(400).json({message: "Try to insert all fields to create your USER!!"})
            }    
        } catch (error) {
            res.status(400).json({erro: error.message});
        }
    }
}

module.exports = new UserController();