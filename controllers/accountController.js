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
                const oldDate = (req.body.accountopening);

            }            
        } catch (error) {
            res.status(400).json({erro: error.message});
        }
        let date = ConvertDate(req.body.accountopening);
        console.log(date);
        /*let accoutNew = {
            agencyId: agencyId,
            clientId: clientId,
            accountopening: newDateFinal         
        }
        const accoutRes = await Account.create(accoutNew);
        res.status(200).json({"Create accout": accoutRes})*/
    }
    async getAll(req,res){
        try {
            const accounts = Account.findAll({
                include: [{
                    model: Client,
                    as: "client"
                },{
                    model: Agency,
                    as: "agency"
                }]
            })
            res.status(200).json({"Accounts": accounts})
        } catch (error) {
            res.status(400).json({erro: error.message})
        }
    }
}

module.exports = new AgencyController();