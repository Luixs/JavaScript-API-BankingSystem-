const { Agency, Bank } = require('../models');

class AgencyController{
    async getAll(req,res){
        try {
            const allAgency = await Agency.findAll({
                include: [{
                    model: Bank,
                    as: "idBank"
                }]
            })
            res.status(200).json({Agencies: allAgency});
        } catch (error) {
            res.status(400).json({erro: error.message})
        }
    }    
}

module.exports = new AgencyController();