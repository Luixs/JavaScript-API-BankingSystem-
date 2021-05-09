const { Bank } =  require('../models');

class BankController{
    async getAll(req,res){
        try {
            const allBanks = await Bank.findAll();
            res.status(200).json({"Bank List": allBanks});
        } catch (error) {
            res.status(400).json({erro: error.message});
        }
    }
    async create(req,res){
        try {
            const cnpjNum = Number(req.body.cnpj);
            let bank = {
                cpnj : cnpjNum,
                companyName: req.body.companyName,
                contact: req.body.contact
            }
            const bankRes = await Bank.create(bank);          
            res.status(200).json({"Bank Insert": bankRes})
        } catch (error) {
            res.status(400).json({erro: error.message});
        }
    }
}

module.exports = new BankController();