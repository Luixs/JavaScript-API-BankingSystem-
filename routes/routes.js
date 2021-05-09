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

// CLIENT ROUTES
routes.get('/clients', ClientController.getAll);
routes.post('/client', ClientController.create);
// AGENCY ROUTES

routes.get('/agencies', AgencyController.getAll);

module.exports = routes;
