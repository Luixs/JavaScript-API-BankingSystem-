const { Bank } =  require('../models');

class BankController{
    async getAll(req,res){
        // #swagger.tags = ['BANK']
        // #swagger.description = 'Search all Banks from de data base'
        /* #swagger.responses[200] = {
            description: 'Return all banks'
        }*/
        /* #swagger.responses[400] = {
            description: "Unexpected error appearing in the message"
        }
         */
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

        /* #swagger.parameters['id'] = {
            in: 'path',
            description: 'try to put a number right here',
            required: true,
            type: 'integer'
        }
        */
        /* #swagger.responses[200] = {
            schema: { $ref: '#/definitions/Bank'},
            description: 'Return a Bank'
        }*/
        /* #swagger.responses[404] = {
            description: 'Not found a Bank Using this ID'
        }*/
        /* #swagger.responses[400] = {
            description: 'Unexpected error appearing in the message'
        }*/
        try {
            const idSearch = Number(req.params.id);
            const bankFind = await Bank.findByPk(idSearch); 
            if(!bankFind){
                res.status(200).json({Mensagem: "Doesn't exist a Bank with this ID!!!Try the a new one"})
            }else{
                res.status(404).json({"Bank Found": bankFind})
            }                     
        } catch (error) {
            res.status(400).json({erro: error.message});
        }
    }
    async create(req,res){
        // #swagger.tags = ['BANK']

        // #swagger.description = 'Create a New Bank into DB'

        /* #swagger.responses[201] = {
            description: 'Successfully Created',
            schema: { $ref: '#/definitions/Bank'},
            
        }*/

        /* #swagger.parameters['cpnj'] = {
            in: 'body',
            description: 'CNPJ Number',
            required: true,
            type: 'string',
            schema: { cpnj: '0565' }
        }
          #swagger.parameters['companyName'] = {
            in: 'body',
            description: 'The company Name',
            required: true,
            type: 'string',
            schema: { companyName: "StarLigth" }
        }
          #swagger.parameters['contact'] = {
            in: 'body',
            description: 'Contact',
            required: true,
            type: 'string',
            schema: { contact: "9985152" }
        }
        */
        try {
            const cnpjNum = Number(req.body.cnpj);
            let bank = {
                cpnj : cnpjNum,
                companyName: req.body.companyName,
                contact: req.body.contact
            }
            const bankRes = await Bank.create(bank);          
            res.status(201).json({"Bank Insert": bankRes})
        } catch (error) {
            res.status(400).json({erro: error.message});
        }
    }
    async update(req,res){
        // #swagger.tags = ['BANK']

        // #swagger.description = 'Update a DateBank using a ID to the find him into DB'

        /* #swagger.responses[200] = {
            description: 'Successfully Updated',
            schema: { $ref: '#/definitions/Bank'},
            
        }*/
        
        /* #swagger.parameters['id'] ={
            in: 'path',
            description: 'Using to find him',
            required: true
        }
            #swagger.parameters['cpnj'] = {
            in: 'body',
            description: 'A New CNPJ Number',
            required: true,
            type: 'string',
            schema: { cpnj: '0565' }
        }
          #swagger.parameters['companyName'] = {
            in: 'body',
            description: 'A New Company Name',
            required: true,
            type: 'string',
            schema: { companyName: "StarLigth" }
        }
          #swagger.parameters['contact'] = {
            in: 'body',
            description: 'A New Contact',
            required: true,
            type: 'string',
            schema: { contact: "9985152" }
        }
        */

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
        // #swagger.tags = ['BANK']
        // #swagger.description = 'Delete a Bank from the DataBase Finded by ID"
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