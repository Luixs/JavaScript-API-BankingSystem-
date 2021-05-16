const express = require('express');
const routes = require('./routes/routes');
const app = express();

//DOCUMENTATION
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swaggerFile.json');

app.use(express.urlencoded({extended: false}));
app.use(routes);

// USING A DOCUMENTATION
app.use('/documentation', swaggerUi.serve, swaggerUi.setup(swaggerFile))

app.listen(3000);