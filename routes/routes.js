const { Router } = require ('express');
/* IMPORTAR CONTROLLERS */

//const PokemonController = require('../controllers/PokemonController');
//const PokeTipoController = require('../controllers/PokeTipoController');

const routes = Router();

routes.get('/', (req,res)=>{
    res.status(200).json({mensagem: "Hello, Welcome to the Bank System"});
})


module.exports = routes;
