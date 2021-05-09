const { Agency, Bank } = require('../models');

class AgencyController{
    async getAll(req,res){
        try {
            const agencies = await Agency.findAll({
                include: [{
                    model: Bank, 
                    as: "bank"                   
                }]
            })
            res.status(200).json({"Agencies": agencies});
        } catch (error) {
            res.status(400).json({erro: error.message});
        }
    }    
    async create(req,res){
        try {
            if(!req.body.bankId){
                throw new Error('Bank ID INVALID!! Try someone else..')
            }else{
                const numberNum = Number(req.body.number);
                let agency = {
                number: numberNum,
                description: req.body.description,
                bankId: Number(req.body.bankId)}
                const agencyRes = await Agency.create(agency);
                res.status(200).json({"AgencyInsert": agencyRes});
            }
        } catch (error) {
            res.status(400).json({erro: error.message});
        }
    }
}

module.exports = new AgencyController();