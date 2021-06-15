const { Router } = require ('express');

/*-------IMPORTS-------*/
const BankController = require ('../controllers/bankController');
const ClientController = require('../controllers/clientController');
const AgencyController = require('../controllers/agencyController');
const AccountController = require('../controllers/accountController');
const AuthController = require('../controllers/authController');
const routes = Router();
const verify = require("../middlewares/authentication");

routes.get('/', (req,res)=>{
    // #swagger.tags = ['Main Route']
    // #swagger.description = 'A Main Route to the Bank System API(BS-API), return a simple JSON'

    /* #swagger.responses[200] = {
        schema: {message: "Hello Horld"},
        description: 'A sucefull Message Route'
    }*/
    res.status(200).json({mensagem: "Hello, Welcome to the Bank System" });
})

// JWT TEST ROUTE
routes.post('/login',AuthController.create);
routes.get('/logout', AuthController.destroyAuth);
routes.get('/testAdmin',verify(['admin']),AuthController.testAdmin);
routes.get('/testUser', verify(['user']), AuthController.testUser);


// ACCOUT ROUTE
routes.get('/accounts',verify(['admin']), AccountController.getAll);
routes.get('/account/:id',verify(['admin']), AccountController.getOne);
routes.put('/account/:id',verify(['admin']), AccountController.update);
routes.post('/account',verify(['admin']), AccountController.create);
routes.delete('/account/:id',verify(['admin']), AccountController.delete);

// BANK ROUTES
routes.get('/banks', BankController.getAll); 
routes.get('/bank/:id', BankController.getOne);
routes.post('/bank', BankController.create);
routes.put('/bank/:id',BankController.update);
routes.delete('/bank/:id',verify(['admin']),BankController.delete);

// CLIENT ROUTES
routes.get('/clients', ClientController.getAll);
routes.get('/client/:id',ClientController.getOne);
routes.post('/client', ClientController.create);
routes.put('/client/:id', ClientController.update);
routes.delete('/client/:id',verify(['admin']), ClientController.delete);


// AGENCY ROUTES
routes.get('/agencies', AgencyController.getAll); 
routes.get('/agency/:id',AgencyController.getOne);
routes.put('/agency/:id',AgencyController.update);
routes.post('/agency',AgencyController.create);
routes.delete('/agency/:id',verify(['admin']),AgencyController.delete);

// USER ROUTES
routes.get('/users', (req,res)=>{
    try {
        res.status(200).json({message: "funcionando!"})
    } catch (error) {
        res.status(400).json({erro: error});
    }
})


//EXPORT ALL ROUTES
module.exports = routes;
