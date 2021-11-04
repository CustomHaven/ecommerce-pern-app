const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
// const session = require('express-session');
// const { SESS } = require('../config');
const db = require('../db');
// const pgSession = require('connect-pg-simple')(session); // will be using sequelize one
// const flash = require('connect-flash');
const expressWinston = require('express-winston');
const loggers = require('../loggers');

// console.log(require('crypto').randomBytes(64).toString('hex'));
module.exports = (app, express) => {

  db.authenticate()
    .then(() => loggers.info('Database connection has been established...'))
    .catch(err => loggers.error('Error ' + err));
  
  app.use(morgan('dev'));
  
  app.use(expressWinston.logger(loggers));

  app.set('view engine', 'ejs');

  // app.use(morgan('dev'));

  app.use(cors());

  // app.use(bodyParser.json());
  // app.use(bodyParser.urlencoded({ extended: true }));


  app.use(express.json());

  app.use(express.urlencoded({ extended: true }));
  
  // app.use(session({
  //   name: SESS.NAME,
  //   secret: SESS.SECRET,
  //   saveUninitialized: false,
  //   resave: false,
  //   store: new pgSession({
  //       pool: db
  //       // tableName: 'session'
  //   }),
  //   cookie: {
  //       maxAge: 1000 * 60 * 60,
  //       // secure: process.env.NODE_ENV ? true : false,
  //       sameSite: true
  //   }
  // }));

  // app.use(flash());

  return app;
}