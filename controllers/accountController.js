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
        // #swagger.tags = ['Account']
        
        // #swagger.description = 'Create a New Account into DB'

        /* #swagger.responses[201] = {
            description: 'Successfully Created',
            schema: { $ref: '#/definitions/Account'}
        }
        */

        /* #swagger.parameters['agencyId'] = {
            in: 'body',
            decription: 'Taked a Agency Account to the Relationship',
            required: true,
            type: 'string',
            schema: { agencyId: '1'}
        } 
          #swagger.parameters['clientId'] = {
            in: 'body',
            decription: 'Taked a Client Account to the Relationship',
            required: true,
            type: 'string',
            schema: { clientId: '1'}
        }
          #swagger.parameters['accountopening'] = {
            in: 'body',
            decription: 'The date of Opening Account',
            required: true,
            type: 'date',
            schema: { clientId: '25-04-2021'}
          }
        */
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
                res.status(201).json({"Create Account": accoutRes})
            }            
        } catch (error) {
            res.status(400).json({erro: error.message});
        }
    }
    async update(req,res){
        // #swagger.tags = ['Account']
        
        // #swagger.descriptiom = 'Update a DateBank using a ID to the find him into DB'

        /* #swagger.responses[200] = {
            description: 'Successfully Updated',
            schema: { $ref: '#/definitions/Bank'},
            
        }*/

        /* #swagger.parameters['id'] ={
            in: 'path',
            description: 'Using to find him',
            required: true
        }        
        #swagger.parameters['agencyId'] = {
            in: 'body',
            decription: 'Taked a Agency Account to the Relationship',
            required: true,
            type: 'string',
            schema: { agencyId: '1'}
        } 
          #swagger.parameters['clientId'] = {
            in: 'body',
            decription: 'Taked a Client Account to the Relationship',
            required: true,
            type: 'string',
            schema: { clientId: '1'}
        }
          #swagger.parameters['accountopening'] = {
            in: 'body',
            decription: 'The date of Opening Account',
            required: true,
            type: 'date',
            schema: { clientId: '25-04-2021'}
          }
        */

        // FINALIZAR ESSA ROUTE NO SUNDAY
        try {
            const idSearch = Number(req.params.id);
            console.log(idSearch)
            const accountFromId = await Account.findByPk(idSearch);
            console.log(accountFromId);
            if(!accountFromId == accountFromId){
                throw new Error("INVALID ID,Try a new One ID!!!")
            }
            /*s
            if(!accountFromId){
                throw new Error("INVALID ID,Try a new One ID!!!")
            }else{
                let newDate = ConvertDate(req.body.accountopening);
                let newAccount = {
                    agencyId: req.body.agencyId,
                    clientId: req.body.clientId,
                    accountopening: newDate
                }
                await accountFromId.update(newAccount);
                res.status(200).json({"account updated": accountFromId});
            }*/
        } catch (error) {
            
        }
    }
    async getAll(req,res){
        // #swagger.tags = ['Account']

        // #swagger.description = 'Search all Accounts from the DataBase'

        /* #swagger.responses[200] = {
            description :'All Accounts returned'
        }
        #swagger.responses[400] = {
            description : 'Unexpected error appearing in the message'
        }
        */
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
        // #swagger.tags = ['Account']

        // #swagger.description = 'Search a Account using a id params'

        /* #swagger.parameters['id'] = {
            in: 'path',
            description: 'insert a number',
            required: true,
            type: 'integer'
        }*/

        /* #swagger.responses[200] = {
            description: 'Return a Account',
            schema: { $ref: '#/definitions/Account'}
        }

        #swagger.responses[400] = {
            description: 'Unexpected error appearing in the message'
        }*/
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
    async delete(req,res){
        // #swagger.tags = ['Account']

        // #swagger.description = 'Delete a Account from the DataBase Finded by ID'

        /* #swagger.responses[200] = {
            description: 'Deleted Account',
            schema: { $ref: '#/definitions/Account'},
            
        }
        #swagger.responses[401] = {
            description: "Not found this Account using the ID"
        }*/

        
        /*#swagger.parameters['id'] ={
            in: 'path',
            description: 'Using to find him',
            required: true
        }*/

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
                await accountFromId.destroy();
                res.status(200).json({"account destroyed": accountFromId});
            }
        } catch (error) {
            res.status(400).json({erro: error.message});
        }
    }
}

module.exports = new AgencyController();