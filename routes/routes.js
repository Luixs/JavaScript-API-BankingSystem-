const { Router } = require ('express');

/*-------IMPORTS-------*/
const BankController = require ('../controllers/bankController');
const ClientController = require('../controllers/clientController');
const AgencyController = require('../controllers/agencyController');
//const PokemonController = require('../controllers/PokemonController');
//const PokeTipoController = require('../controllers/PokeTipoController');

const routes = Router();

routes.get('/', (req,res)=>{
    res.status(200).json({mensagem: "Hello, Welcome to the Bank System"});
})

// BANK ROUTES
routes.get('/banks', BankController.getAll);
routes.post('/bank', BankController.create);

// CLIENT ROUTES
routes.get('/clients', ClientController.getAll);
routes.post('/client', ClientController.create);
// AGENCY ROUTES

routes.get('/agencies', AgencyController.getAll);
routes.post('/agency',AgencyController.create);

module.exports = routes;
