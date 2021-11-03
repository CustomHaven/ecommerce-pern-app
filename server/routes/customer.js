const customerController = require('../controllers/customerController');
const router = require('express').Router();

module.exports = (app) => {
  app.use('/customer', router);

  router.post('/', customerController.addCustomer)
  router.get('/', customerController.findAll)
  router.get('/:id', customerController.findACustomer)
  router.put('/:id', customerController.updateCustomer)
  router.delete('/:id', customerController.removeCustomer)

  return router
}