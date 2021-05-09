const { Router } = require ('express');

/*-------IMPORTS-------*/
const BankController = require ('../controllers/bankController');
const ClientController = require('../controllers/clientController');
const AgencyController = require('../controllers/agencyController');

const routes = Router();

routes.get('/', (req,res)=>{
    res.status(200).json({mensagem: "Hello, Welcome to the Bank System"});
})

// BANK ROUTES
routes.get('/banks', BankController.getAll);
routes.get('/bank/:id', BankController.getOne);
routes.post('/bank', BankController.create);
routes.put('/bank/:id',BankController.update);
routes.delete('/bank/:id',BankController.delete);

// CLIENT ROUTES
routes.get('/clients', ClientController.getAll);
routes.get('/client/:id',ClientController.getOne);
routes.post('/client', ClientController.create);
routes.put('/client/:id', ClientController.update);
routes.delete('/client/:id', ClientController.delete);

// AGENCY ROUTES
routes.get('/agencies', AgencyController.getAll);
routes.get('/agency/:id',AgencyController.getOne);
routes.put('/agency/:id',AgencyController.update);
routes.post('/agency',AgencyController.create);
routes.delete('/agency/:id',AgencyController.delete);
module.exports = routes;
