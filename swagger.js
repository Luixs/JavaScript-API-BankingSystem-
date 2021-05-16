const swaggerAutogen = require('swagger-autogen')()

const outputFile = './swaggerFile.json'
const routes = ['./index.js'];

swaggerAutogen(outputFile, routes).then(() => {
    require('./index.js')
})