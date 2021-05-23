const { Client } = require('../models');

class ClientController{
    async getAll(req,res){
        // #swagger.tags = ['Client']

        // #swagger.description = 'Search all Clients from the DataBase'
        
        /* #swagger.responses[200] = {
            description: 'Return all Clients'
        }
        #swagger.responses[400] = {
            description: "Unexpected error appearing in the message"
        }
        */
        try {
            const allClient = await Client.findAll();
            res.status(200).json({"Client List": allClient});
        } catch (error) {
            res.status(400).json({erro: error.message});
        }
    }
    async getOne(req,res){

        // #swagger.tags = ['Client']

        // #swagger.description = 'Search a Client using a id params'

        /* #swagger.parameters['id'] = {
            in: 'path',
            description: 'Put a number',
            required: true,
            type: 'integer'
        }
        */

        /* #swagger.responses[200] = {
            schema: { $ref: '#/definitions/Client'},
            description: 'Return a Client'
        }*/
        /* #swagger.responses[404] = {
            description: 'Not found a Client Using this ID'
        }*/
        /* #swagger.responses[400] = {
            description: 'Unexpected error appearing in the message'
        }*/
        try {
            const idSearch = Number(req.params.id);
            const clientFind = await Client.findByPk(idSearch); 
            if(!clientFind){
                res.status(200).json({Mensagem: "Doesn't exist a client with this ID!!!Try the a new one"})
            }else{
                res.status(200).json({"Client Found": clientFind})
            }                     
        } catch (error) {
            res.status(400).json({erro: error.message});
        }
    }
    async create(req,res){
        // #swagger.tags = ['Client']

        // #swagger.description = 'Create a New Client into DB'

        /* #swagger.responses[201] = {
            description: 'Successfully Created',
            schema: { $ref: '#/definitions/Client'}            
        }*/

        /* #swagger.parameters['name'] = {
            in: 'body',
            description: 'Insert a name',
            required: true,
            type: 'string',
            schema: { name: 'Luis Starlino' }
        } 
        #swagger.parameters['cpf'] = {
            in: 'body',
            description: 'Insert a cpf',
            required: true,
            type: 'integer',
            schema: { cpf: 5212515 }
        } 
        #swagger.parameters['gender'] = {
            in: 'body',
            description: 'Insert a gender',
            required: true,
            type: 'string',
            schema: { gender: 'Male' }
        }
        #swagger.parameters['wage'] = {
            in: 'body',
            description: 'Insert a wage',
            required: true,
            type: 'integer',
            schema: { wage: 50000 }
        }
        #swagger.parameters['contact'] = {
            in: 'body',
            description: 'Insert a contact',
            required: true,
            type: 'string',
            schema: { contact: "+55 31 9859945" }
        }        
        */
        try {
            const wageNum = Number(req.body.wage);
            const cpfNum = Number(req.body.cpf);
            let clientvez = {
                name: req.body.name,
                cpf : cpfNum,
                gender: req.body.gender,
                wage: wageNum,
                contact: req.body.contact
            }
            const ClientRes =  await Client.create(clientvez);
            res.status(200).json({"Client insert": ClientRes})
        } catch (error) {
            res.status(400).json({erro: error.message});
        }
    }
    async update (req,res){
        // #swagger.tags = ['Client']

        // #swagger.description = 'Update a DataBase using a ID'

        /* #swagger.responses[200] = {
            description: 'Successfully Updated',
            schema: { $ref: '#/definitions/Bank'},    
        }
        #swagger.responses[404] = {
            description: 'Not found a Client using this ID'
        }
        #swagger.responses[400] = {
            description: 'Unexpected error appearing in the message'
        }
        */

        /* #swagger.parameters['id'] ={
            in: 'path',
            description: 'Using to find him',
            required: true
        }        
        #swagger.parameters['name'] = {
            in: 'body',
            description: 'Insert a New name',
            required: true,
            type: 'string',
            schema: { name: 'Luis Starlino' }
        } 
        #swagger.parameters['cpf'] = {
            in: 'body',
            description: 'Insert a New cpf',
            required: true,
            type: 'integer',
            schema: { cpf: 5212515 }
        } 
        #swagger.parameters['gender'] = {
            in: 'body',
            description: 'Insert a New gender',
            required: true,
            type: 'string',
            schema: { gender: 'Male' }
        }
        #swagger.parameters['wage'] = {
            in: 'body',
            description: 'Insert a New wage',
            required: true,
            type: 'integer',
            schema: { wage: 50000 }
        }
        #swagger.parameters['contact'] = {
            in: 'body',
            description: 'Insert a New contact',
            required: true,
            type: 'string',
            schema: { contact: "+55 31 9859945" }
        }        
        */
        try {
            const idSearch = Number(req.params.id);
            const clientFind = await Client.findByPk(idSearch); 
            if(clientFind){
                let newClient = {
                    name: req.body.name,
                    cpf : Number(req.body.cpf),
                    gender: req.body.gender,
                    wage: Number(req.body.wage),
                    contact: req.body.contact
                }
                await clientFind.update(newClient);
                return res.status(200).json({"Client Updated": clientFind})
            }else{
                res.status(404).json("Doesn't exist a client with this ID!!!Try the a new one")
            }
        } catch (error) {
            res.status(400).json({erro: error.message});
        }        
    }
    async delete (req,res){
        // #swagger.tags = ['Client']

        // #swagger.description = 'Delete a Client from the DataBase Finded by ID'

        /* #swagger.responses[200] = {
            description: 'Deleted Client',
            schema: { $ref: '#/definitions/Client'},
            
        }
        #swagger.responses[401] = {
            description: "Not found this Client using the ID"
        }*/

        
        /*#swagger.parameters['id'] ={
            in: 'path',
            description: 'Using to find him',
            required: true
        }*/

        try {
            const idSearch = Number(req.params.id);
            const clientFind = await Client.findByPk(idSearch); 
           if(!clientFind){
            res.status(401).json({Mensagem: "Doesn't exist a client with this ID!!!Try the a new one"})
           }else{
               await clientFind.destroy();
               return res.status(200).json({"Destroy this Client": clientFind});
           }
        } catch (error) {
            res.status(400).json({erro: error.message});
        }
    }
}

module.exports = new ClientController();