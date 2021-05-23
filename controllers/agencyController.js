const { Agency, Bank } = require('../models');

class AgencyController{
    async getAll(req,res){
        // #swagger.tags = ['Agency']

        // #swagger.description = 'Search all Agencies from the DataBase'
        
        /* #swagger.responses[200] = {
            description: 'Return all clients'
        }
        #swagger.responses[400] = {
            description: "Unexpected error appearing in the message"
        }
        */
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
        // #swagger.tags = ['Agency']

        // #swagger.description = 'Search a Agency using a id params'  

        /* #swagger.parameters['id'] = {
            in: 'path',
            description: 'Put a number',
            required: true,
            type: 'integer'
        }*/

        /* #swagger.responses[200] = {
            schema: { $ref: '#/definitions/Agency'},
            description: 'Return a Agency'
        }*/
        /* #swagger.responses[400] = {
            description: 'Unexpected error appearing in the message'
        }*/
        /* #swagger.responses[404] = {
            description: 'Not found a Agency Using this ID'
        }*/
        try {
            const getID = Number(req.params.id);
            const agencyById = await Bank.findByPk(getID);
            if(!agencyById){
                res.status(404).json("Agency ID INVALID!! Try someone else..")
            }else{
                res.status(200).json({"Agency Found": agencyById});
            }
        } catch (error) {
            res.status(400).json({erro: error.message});
        }
    }
    async update(req,res){
        // #swagger.tags = ['Agency']

        // #swagger.description = 'Search a Agency using a id params'  

        /* #swagger.responses[200] = {
            description: 'Successfully Updated',
            schema: { $ref: '#/definitions/Agency'},
        }
        #swagger.responses[400] = {
            description: 'Unexpected error appearing in the message'
        }
        #swagger.responses[404] = {
            description: 'Not found a Agency Using this ID'
        }
        */

        /*#swagger.parameters['id'] ={
            in: 'path',
            description: 'Using to find him',
            required: true
        }
        #swagger.parameters['number'] = {
            in: 'body',
            description: 'Put New a Number identification',
            type: 'integer',
            schema: { number: 44}
        }
        #swagger.parameters['description'] = {
            in: 'body',
            description: 'Put a New  description agency',
            type: 'string',
            schema: { description: "Insert right here a description"}
        }
        #swagger.parameters['bankId'] = {
            in: 'body',
            description: 'Put a New Bank Id',
            type: 'integer',
            schema: { bankId: 1}
        }
        */

        try {
            const findById = Number(req.params.id);
            const agencyFind = await Agency.findByPk(findById);           
            if(!agencyFind){
                res.status(404).json("Doesn't exist a Agencuy with this ID!!!Try the a new one")
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
        // #swagger.tags = ['Agency']

        // #swagger.description = 'Delete a Agency from the DataBase Finded by ID'  

        /* #swagger.responses[201] = {
            description: 'Deleted Agency',
            schema: { $ref: '#/definitions/Agency'},
            
        }
        #swagger.responses[404] = {
            description: "Not found this Agency using the ID"
        }*/  

        /*#swagger.parameters['id'] ={
            in: 'path',
            description: 'Using to find him',
            required: true
        }*/

        try {
            const findById = Number(req.params.id);
            const agencyFind = await Agency.findByPk(findById);
            if(agencyFind){
                await agencyFind.destroy();
                return res.status(201).json({"Destroy this agency": agencyFind})
            }else{
                res.status(404).json("Doesn't exist a Agencuy with this ID!!!Try the a new one")
            }
        } catch (error) {
            res.status(400).json({erro: error.message});
        }
    }
    async create(req,res){
        // #swagger.tags = ['Agency']

        // #swagger.description = 'Create a New Agency into DB'  

        /* #swagger.responses[201] = {
            schema: { $ref: '#/definitions/Agency'},
            description: 'Successfully Created'
        }
        #swagger.responses[400] = {
            description: 'Unexpected error appearing in the message'
        }*/

        /*#swagger.parameters['number'] = {
            in: 'body',
            description: 'Put a Number identification',
            type: 'integer',
            schema: { number: 44}
        }
        #swagger.parameters['description'] = {
            in: 'body',
            description: 'Put a description agency',
            type: 'string',
            schema: { description: "Insert right here a description"}
        }
        #swagger.parameters['bankId'] = {
            in: 'body',
            description: 'Put a Bank Id',
            type: 'integer',
            schema: { bankId: 1}
        }*/
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
                res.status(201).json({"AgencyInsert": agencyRes});
            }
        } catch (error) {
            res.status(400).json({erro: error.message});
        }
    }
}

module.exports = new AgencyController();