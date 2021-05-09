const { Client } = require('../models');

class ClientController{
    async getAll(req,res){
        try {
            const allClient = await Client.findAll();
            res.status(200).json({"Client List": allClient})
        } catch (error) {
            res.status(400).json({erro: error.message})               
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
            res.status(400).json({erro: error.message})               
        }
    }
}

module.exports = new ClientController();