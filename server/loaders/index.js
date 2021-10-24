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
    console.log(err)
    // loggers.http(status);
    console.log('statusCode')
    console.log(err.original)
    console.log(status)
    console.log(code)
    console.log('statusCode')
    console.log(httpStatusCode)
    // console.log('errsssssssssssss\n\n\n\n')
    // loggers.error(message)
    return res.status(status).send({ message });
  });
}