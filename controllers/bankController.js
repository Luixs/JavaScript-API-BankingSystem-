const { Bank } =  require('../models');

class BankController{
    async getAll(req,res){
        try {
            const allBanks = await Bank.findAll();
            res.status(200).json({"Bank List": allBanks})
        } catch (error) {
            res.status(400).json({erro: error.message})            
        }
    }

}

module.exports = new BankController();