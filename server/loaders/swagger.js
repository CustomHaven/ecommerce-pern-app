const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const path = require('path');

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Ecommerce Pern APP',
      version: '1.0.0',
      description: 'Open documention to the backend off the app',
      license: {
        name: 'MIT',
        url: 'https://choosealicense.com/licenses/mit/',
      }
    },
    schema: [
      'http',
      'https'
    ],
    servers: [
      {
        url: 'http://localhost:5000'
      }
    ],
  },
  apis: [`${path.resolve(__dirname, '../routes')}/*.js`]
}

module.exports = (app) => {
  // Serves Swagger API documentation to /api-docs url
  const specs = swaggerJsDoc(swaggerOptions)

  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, {
    explorer: true
  }));
}