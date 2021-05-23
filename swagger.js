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
        BankId: 1
    },Account: {
        accountopening: "25-04-2021",
        clientId: 1,
        agencyId: 1
    },Client: {
        name: "Luis Starlino",
        cpf: 1423058026,
        gender: "Male",
        wage: 5000,
        contact:"+55 031 998250691"
    }
}
};

swaggerAutogen(outputFile, routes, docs).then(() => {
    require('./index.js')
});