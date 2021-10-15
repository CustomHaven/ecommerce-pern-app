const { Sequelize } = require('sequelize');
const logger = require('../loggers');
const { DB } = require('../config');


const db = new Sequelize(`${DB.DIALECT}://${DB.USER}:${DB.PASS}@${DB.HOST}:${DB.PORT}/${DB.DB}`, {
    logging: msg => logger.debug(msg)
}) // Example for postgres

module.exports = db;