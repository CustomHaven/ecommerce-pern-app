const expressLoader = require('./express');
const routeLoader = require('../routes');
const expressWinston = require('express-winston');
const loggers = require('../loggers');

module.exports = async (app, express) => {
  await expressLoader(app, express);

  await routeLoader(app);

  // app.use(expressWinston.errorLogger(loggers))
}