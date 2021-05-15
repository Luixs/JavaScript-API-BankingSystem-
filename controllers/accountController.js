const { Agency, Client, Account} = require('../models');

//CONVERTING DATE
function ConvertDate(data){
    let oldDate = data;
    const newDate = oldDate.split('-');
    const newDate2 = `${newDate[1]}-${newDate[0]}-${newDate[2]}`
    return new Date(newDate2);

}

class AgencyController{
    async create(req,res){
        try {
            const agencyId = Number(req.body.agencyId);
            const clientId = Number(req.body.clientId);
            if(!agencyId && !clientId){
                res.status(401).json({Erro: "ID Client or Agency ID is not found, try again"})
            }else{
                let date = ConvertDate(req.body.accountopening);                
                let accoutNew = {
                    agencyId: agencyId,
                    clientId: clientId,
                    accountopening: date         
                }
                const accoutRes = await Account.create(accoutNew);
                res.status(200).json({"Create Account": accoutRes})
            }            
        } catch (error) {
            res.status(400).json({erro: error.message});
        }
    }
    async getAll(req,res){
        try {
            const allAccounts = await Account.findAll({
                include: [{
                    model: Client,
                    as: "client"
                },{
                    model: Agency,
                    as: "agency"
                }]
            })
            res.status(200).json({"Accounts": allAccounts})
        } catch (error) {
            res.status(400).json({erro: error.message});
        }
    }
    async getOne(req,res){
        try {
            const idSearch = Number(req.params.id);
            const accountFromId = await Account.findByPk(idSearch,{
                include: [{
                    model: Client,
                    as: "client"
                },{
                    model: Agency,
                    as: "agency"
                }]
            });
            if(!accountFromId){
                throw new Error("INVALID ID,Try a new One ID!!!")
            }else{
                res.status(200).json({"account found": accountFromId});
            }
        } catch (error) {
            res.status(400).json({erro: error.message});
        }
    }
}

module.exports = new AgencyController();