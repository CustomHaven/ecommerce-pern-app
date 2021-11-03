const userController = require('../controllers/userController');
const router = require('express').Router();

module.exports = (app) => {
  app.use('/user', router);

  router.post('/', userController.addUser)
  router.get('/', userController.findAll)
  router.get('/:id', userController.findAUser)
  router.put('/:id', userController.updateUser)
  router.delete('/:id', userController.removeUser)

  return router
}