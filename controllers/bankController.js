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
    async getOne(req,res){
        // #swagger.tags = ['BANK']
        // #swagger.description = 'Search a Bank using a id params'

        /* #swagger.responses[200] = {
            schema: { $ref: '#/definitions/Bank'},
            description: 'Return a Bank'
        }*/
        try {
            const idSearch = Number(req.params.id);
            const bankFind = await Bank.findByPk(idSearch); 
            if(!bankFind){
                res.status(200).json({Mensagem: "Doesn't exist a Bank with this ID!!!Try the a new one"})
            }else{
                res.status(200).json({"Bank Found": bankFind})
            }                     
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
    async update(req,res){
        try {
            const findById = Number(req.params.id);
            const bankFind = await Bank.findByPk(findById);
            if(!bankFind){
                res.status(400).json("Doesn't exist a Bank with this ID!!!Try the a new one")
            }else{
                let newBank = {
                    cpnj : req.body.cpnj,
                    companyName: req.body.companyName,
                    contact: req.body.contact
                }
                await bankFind.update(newBank);
                return res.status(200).json({"New Bank Status": bankFind});
            }
        } catch (error) {
            res.status(400).json({erro: error.message});
        }
    }
    async delete(req,res){
        try {
            const findById = Number(req.params.id);
            const bankFind = await Bank.findByPk(findById);
            if(!bankFind){
                res.status(400).json("Doesn't exist a Bank with this ID!!!Try the a new one")
            }else{
                await bankFind.destroy();
                return res.status(200).json({"Destroy this Bank": bankFind});
            }
        } catch (error) {
            res.status(400).json({erro: error.message});
        }
    }
}

module.exports = new BankController();