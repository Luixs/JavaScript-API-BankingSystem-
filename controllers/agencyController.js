const { Agency, Bank } = require('../models');

class AgencyController{
    async getAll(req,res){
        try {
            const agencies = await Agency.findAll({
                include: [{
                    model: Bank, 
                    as: "bank"                   
                },
            ]
            })
            res.status(200).json({"Agencies": agencies});
        } catch (error) {
            res.status(400).json({erro: error.message});
        }
    }
    async getOne(req,res){
        try {
            const getID = Number(req.params.id);
            const agencyById = await Bank.findByPk(getID);
            if(!agencyById){
                res.status(400).json("Agency ID INVALID!! Try someone else..")
            }else{
                res.status(200).json({"Agency Found": agencyById});
            }
        } catch (error) {
            res.status(400).json({erro: error.message});
        }
    }
    async update(req,res){
        try {
            const findById = Number(req.params.id);
            const agencyFind = await Agency.findByPk(findById);
            if(!agencyFind){
                res.status(400).json("Doesn't exist a Agencuy with this ID!!!Try the a new one")
            }else{
                let newAgency = {
                    number : Number(req.body.number),
                    description: req.body.description,
                    bankId: req.body.bankId
                }
                await agencyFind.update(newAgency);
                return res.status(200).json({"New Agency Status": agencyFind});
            }
        } catch (error) {
            res.status(400).json({erro: error.message});
        }
    }
    async delete(req,res){
        try {
            const findById = Number(req.params.id);
            const agencyFind = await Agency.findByPk(findById);
            if(agencyFind){
                await agencyFind.destroy();
                return res.status(201).json({"Destroy this agency": agencyFind})
            }else{
                res.status(400).json("Doesn't exist a Agencuy with this ID!!!Try the a new one")
            }
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
                bankId: Number(req.body.bankId),
                }
                const agencyRes = await Agency.create(agency);
                res.status(200).json({"AgencyInsert": agencyRes});
            }
        } catch (error) {
            res.status(400).json({erro: error.message});
        }
    }
}

module.exports = new AgencyController();