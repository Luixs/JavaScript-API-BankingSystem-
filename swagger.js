const swaggerAutogen = require('swagger-autogen')()

const outputFile = './swaggerFile.json'
const routes = ['./index.js'];
const docs = {
  "swagger": "2.0",
  "info": {
    "version": "1.0.0",
    "title": "BANKING SYSTEM API",
    "description": "Developed by Luis Starlino "
  },
  "host": "localhost:3000",
  "basePath": "/",
  "tags": [],
  "schemes": [
    "http"
  ],
  "consumes": ["application/json"],
  "produces": ["application/json"],
  "definitions": {
      Bank: {
        cpnj: 142680,
        companyName: "Star Bank",
        contact: "+55 31 998250691"
    },Agency: {
        number: 44,
        description: "Description of the simples Agency with a Bank associate",
        bank:{
            $ref: '#/definitions/Bank'
        }
    }
}
};

swaggerAutogen(outputFile, routes, docs).then(() => {
    require('./index.js')
});