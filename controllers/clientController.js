const { Client } = require('../models');

class ClientController{
    async getAll(req,res){
        try {
            const allClient = await Client.findAll();
            res.status(200).json({"Client List": allClient});
        } catch (error) {
            res.status(400).json({erro: error.message});
        }
    }
    async getOne(req,res){
        try {
            const idSearch = Number(req.params.id);
            const clientFind = await Client.findByPk(idSearch); 
            if(!clientFind){
                res.status(200).json({Mensagem: "Doesn't exist a client with this ID!!!Try the a new one"})
            }else{
                res.status(200).json({"Client Found": clientFind})
            }                     
        } catch (error) {
            res.status(400).json({erro: error.message});
        }
    }
    async create(req,res){
        try {
            const wageNum = Number(req.body.wage);
            const cpfNum = Number(req.body.cpf);
            let clientvez = {
                name: req.body.name,
                cpf : cpfNum,
                gender: req.body.gender,
                wage: wageNum,
                contact: req.body.contact
            }
            const ClientRes =  await Client.create(clientvez);
            res.status(200).json({"Client insert": ClientRes})
        } catch (error) {
            res.status(400).json({erro: error.message});
        }
    }
    async update (req,res){
        try {
            const idSearch = Number(req.params.id);
            const clientFind = await Client.findByPk(idSearch); 
            if(clientFind){
                let newClient = {
                    name: req.body.name,
                    cpf : Number(req.body.cpf),
                    gender: req.body.gender,
                    wage: Number(req.body.wage),
                    contact: req.body.contact
                }
                await clientFind.update(newClient);
                return res.status(200).json({"Client Updated": clientFind})
            }else{
                res.status(400).json("Doesn't exist a client with this ID!!!Try the a new one")
            }
        } catch (error) {
            res.status(400).json({erro: error.message});
        }        
    }
    async delete (req,res){
        try {
            const idSearch = Number(req.params.id);
            const clientFind = await Client.findByPk(idSearch); 
           if(!clientFind){
            res.status(200).json({Mensagem: "Doesn't exist a client with this ID!!!Try the a new one"})
           }else{
               await clientFind.destroy();
               return res.status(200).json({"Destroy this Client": clientFind});
           }
        } catch (error) {
            res.status(400).json({erro: error.message});
        }
    }
}

module.exports = new ClientController();