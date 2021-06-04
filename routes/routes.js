const { Router } = require ('express');

/*-------IMPORTS-------*/
const BankController = require ('../controllers/bankController');
const ClientController = require('../controllers/clientController');
const AgencyController = require('../controllers/agencyController');
const AccountController = require('../controllers/accountController');
const AuthController = require('../controllers/authController');
const routes = Router();
const jwt = require('jsonwebtoken');
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
/*
routes.post('/login', (req,res)=>{
    if(req.body.user == "luixs" && req.body.password == "123"){
        let id = 44;
        let role = "user";
        const token = jwt.sign({id: id, role: role}, process.env.ACCESS_SECRET,{
            expiresIn: 1500
        });
        res.status(200).json({
            auth: true,
            token: token
        })
    }else if(req.body.user == "admin" && req.body.password == "admin"){
        let id = 88;
        let role="admin";
        const token = jwt.sign({id: id, role: role}, process.env.ACCESS_SECRET,{
            expiresIn: 1500
        });
        res.status(200).json({
            auth: true,
            token: token
        })
    }
    else{
        res.status(401).json({message: "User not authorized, try a new one"})
    }
})
*/
routes.get('/logout', (req,res)=> {
    res.status(200).json({auth: false, token:null})
})

routes.get('/testAdmin',verify(['admin']), (req,res)=>{
    res.status(200).json({message: "JWT ADMIN is WORKING!!"})
})


routes.get('/testUser',verify(['user','admin']), (req,res)=>{
    res.status(200).json({message: "JWT USER is WORKING!!"})
})
// AULA RAMON 1:49



// ACCOUT ROUTE
routes.get('/accounts', AccountController.getAll);
routes.get('/account/:id', AccountController.getOne);
routes.put('/account/:id', AccountController.update);
routes.post('/account', AccountController.create);
routes.delete('/account/:id', AccountController.delete);

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

//EXPORT ALL ROUTES
module.exports = routes;
