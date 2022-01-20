const userRouter = require('./user');
const customerRouter = require('./customer');
const dealerRouter = require('./dealer');
const dealerProductRouter = require('./dealerProduct');
const storeProductRouter = require('./storeProduct');
const orderRouter = require('./order');
const supplierRouter = require('./supplier');

module.exports = (app) => {
  userRouter(app);
  customerRouter(app);
  dealerRouter(app);
  dealerProductRouter(app);
  storeProductRouter(app);
  orderRouter(app);
  supplierRouter(app);
  
  return app
}