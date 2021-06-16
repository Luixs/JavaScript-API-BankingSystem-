const { Router } = require ('express');

/*-------IMPORTS-------*/
const BankController = require ('../controllers/bankController');
const ClientController = require('../controllers/clientController');
const AgencyController = require('../controllers/agencyController');
const AccountController = require('../controllers/accountController');
const AuthController = require('../controllers/authController');
const UserController = require('../controllers/userController');
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

// JWT TEST ROUTE - ALL DONE
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
routes.get('/banks',verify(['admin']), BankController.getAll); 
routes.get('/bank/:id',verify(['admin']), BankController.getOne);
routes.post('/bank',verify(['admin']), BankController.create);
routes.put('/bank/:id',verify(['admin']),BankController.update);
routes.delete('/bank/:id',verify(['admin']),BankController.delete);

// CLIENT ROUTES
routes.get('/clients',verify(['admin']), ClientController.getAll);
routes.get('/client/:id',verify(['admin']),ClientController.getOne);
routes.post('/client',verify(['admin']), ClientController.create);
routes.put('/client/:id',verify(['admin']), ClientController.update);
routes.delete('/client/:id',verify(['admin']), ClientController.delete);


// AGENCY ROUTES
routes.get('/agencies',verify(['admin']), AgencyController.getAll); 
routes.get('/agency/:id',verify(['admin']),AgencyController.getOne);
routes.put('/agency/:id',verify(['admin']),AgencyController.update);
routes.post('/agency',verify(['admin']),AgencyController.create);
routes.delete('/agency/:id',verify(['admin']),AgencyController.delete);

// USER ROUTES
routes.get('/users',verify(['admin']), UserController.getAll);
routes.post('/user', UserController.create);


//EXPORT ALL ROUTES
module.exports = routes;
