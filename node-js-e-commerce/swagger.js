const swaggerAutogen = require('swagger-autogen')()

const outputFile = './swagger_output1.json'
const endpointsFiles = ['./server.js']

swaggerAutogen(outputFile, endpointsFiles).then(() => {
    require('./server')
})