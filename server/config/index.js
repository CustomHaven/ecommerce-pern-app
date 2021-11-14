require('dotenv').config();
module.exports = {
  DB: {
    DIALECT: process.env.DB_DIALECT,
    USER: process.env.DB_USER,
    PASS: process.env.DB_PASS,
    HOST: process.env.DB_HOST,
    PORT: process.env.DB_PORT,
    DB: process.env.DB_DB
  },
  TOKEN: process.env.TOKEN_SECRET
}