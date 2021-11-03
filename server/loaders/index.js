const expressLoader = require('./express');
const routeLoader = require('../routes');
const expressWinston = require('express-winston');
const loggers = require('../loggers');

module.exports = async (app, express) => {
  await expressLoader(app, express);

  await routeLoader(app);

  // app.use(expressWinston.errorLogger(loggers))
  app.use((err, req, res, next) => {
    const { message, httpStatusCode, code, status } = err;
    // console.log(err)
    // loggers.http(status);
    // loggers.error(message)
    return res.status(status === undefined ? 500 : status).send({ message });
  });
  return app
}