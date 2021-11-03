const dealerController = require('../controllers/dealerController');
const router = require('express').Router();

module.exports = (app) => {
  app.use('/dealers', router);

  router.post('/', dealerController.addDealer)
  router.get('/', dealerController.findAll)
  router.get('/:id', dealerController.findADealer)
  router.put('/:id', dealerController.updateDealer)
  router.delete('/:id', dealerController.removeDealer)

  return router
}