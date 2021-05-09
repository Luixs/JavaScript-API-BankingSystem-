const { Account } = require('../models/Account');

class AgencyController{
    async create(req,res){
        const agencyId = Number(req.body.agencyId);
        const clientId = Number(req.body.clientId);
        const oldDate = (req.body.accountopening);
        const newDate = oldDate.split('-');
        const newDate2 = `${newDate[1]}-${newDate[0]}-${newDate[2]}`
        const newDateFinal = new Date(newDate2);
        let accoutNew = {
            agencyId: agencyId,
            clientId: clientId,
            accountopening: newDateFinal         
        }
        const accoutRes = await Account.create(accoutNew);
        res.status(200).json({"Create accout": accoutRes})
    }
}

module.exports = new AgencyController();