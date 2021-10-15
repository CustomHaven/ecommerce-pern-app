const express = require('express');
const loggers = require('./loggers');
const loaders = require('./loaders');
const app = express();
const PORT = process.env.PORT || 5000;
const allModels = require('./models');
const db = require('./db');

async function startServer () {
// To send app as a prop to an entire directory we need a index.js to handle all the js files in the directory and send the prop to the others
    // app.use(express.static(__dirname + '/public'));
    allModels(db)
  loaders(app, express);


  app.listen(PORT, () => {
    loggers.info(`Server is listening on port #${PORT}`);
  });//

}

startServer();