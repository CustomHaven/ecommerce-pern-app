const dealerProductController = require('../controllers/dealerProductController');
const router = require('express').Router();

module.exports = (app) => {
  app.use('/dealer/product', router);

  router.post('/', dealerProductController.addDealerProduct)
  router.get('/', dealerProductController.findAll)
  router.get('/:id', dealerProductController.findADealerProduct)
  router.put('/:id', dealerProductController.updateDealerProduct)
  router.delete('/:id', dealerProductController.removeDealerProduct)

  return router
}