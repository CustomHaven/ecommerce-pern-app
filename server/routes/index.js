const simpleRouter = require('./simple');
const userRouter = require('./user');
const customerRouter = require('./customer');
const dealerRouter = require('./dealer');
const dealerProductRouter = require('./dealerProduct');
const storeProductRouter = require('./storeProduct');
const orderRouter = require('./order');

module.exports = (app) => {
  simpleRouter(app);
  userRouter(app);
  customerRouter(app);
  dealerRouter(app);
  dealerProductRouter(app);
  storeProductRouter(app);
  orderRouter(app);
  
  return app
}