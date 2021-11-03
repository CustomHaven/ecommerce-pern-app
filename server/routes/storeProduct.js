const storeProductController = require('../controllers/storeProductController');
const router = require('express').Router();

module.exports = (app) => {
  app.use('/store/product', router);

  router.post('/', storeProductController.addStoreProduct)
  router.get('/', storeProductController.findAll)
  router.get('/:id', storeProductController.findAStoreProduct)
  router.put('/:id', storeProductController.updateStoreProduct)
  router.delete('/:id', storeProductController.removeStoreProduct)

  return router
}