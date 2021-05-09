const { Router } = require ('express');

/*-------IMPORTS-------*/
const BankController = require ('../controllers/bankController');
const ClientController = require('../controllers/clientController');
const AgencyController = require('../controllers/agencyController');
const bankController = require('../controllers/bankController');
//const PokemonController = require('../controllers/PokemonController');
//const PokeTipoController = require('../controllers/PokeTipoController');

const routes = Router();

routes.get('/', (req,res)=>{
    res.status(200).json({mensagem: "Hello, Welcome to the Bank System"});
})

// BANK ROUTES
routes.get('/banks', BankController.getAll);
routes.get('/bank/:id', bankController.getOne);
routes.post('/bank', BankController.create);
routes.put('/bank/:id',bankController.update);
routes.delete('/bank/:id',bankController.delete);

// CLIENT ROUTES
routes.get('/clients', ClientController.getAll);
routes.get('/client/:id',ClientController.getOne);
routes.post('/client', ClientController.create);
routes.put('/client/:id', ClientController.update);
routes.delete('/client/:id', ClientController.delete);
// AGENCY ROUTES

routes.get('/agencies', AgencyController.getAll);
routes.post('/agency',AgencyController.create);

module.exports = routes;
