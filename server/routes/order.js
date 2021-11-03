const orderController = require('../controllers/orderController');
const router = require('express').Router();

module.exports = (app) => {
  app.use('/orders', router);

  router.post('/', orderController.addOrder)
  router.get('/', orderController.findAllOrders)
  router.get('/list', orderController.findAllOrderList)
  router.get('/:id', orderController.findYourOrder)

  return router
}
/*
findAllOrders
findAllOrderList
findYourOrder
addOrder
*/