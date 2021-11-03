const simpleRouter = require('express').Router();
const DealerProductService = require('../services/dealerProductService');
const DealerService = require('../services/dealerService');
const dealerService = new DealerService();
const dealerProductService = new DealerProductService();
const logger = require('../loggers');
const StoreProductService = require('../services/storeProductService');
const storeProductService = new StoreProductService();
const UserService = require('../services/userService');
const userService = new UserService();
const CustomerService = require('../services/customerService');
const customerService = new CustomerService();
const createError = require('http-errors');
const OLService = require('../services/orderListService');
const olService = new OLService();

module.exports = (app)=> {
  app.use('/hi', simpleRouter);

  simpleRouter.get('/', async (req, res) => {
    try {
      const all = await olService.findAllOrderList();

      res.status(200).send(all)
        
    } catch (error) {
      logger.log(error)
    }
  })

  simpleRouter.post('/', async (req, res, next) => {
    try {
      // const add = await dealerService.addDealer(req.body)
      const body = req.body.map(ee =>  ({ ...ee, quantity: Number(ee.quantity)} ));
      const add = await olService.addOrderList(body)
      // req.body.price = req.body.price !== undefined && parseFloat(req.body.price);
      // req.body.quantity = parseInt(req.body.quantity);
      // const add = await dealerProductService.addDealerProduct(req.body)
      // console.log(add)
      res.status(201).send(add);
      
    } catch (error) {
      // console.log(error)
      next(error)
    }
  })

  simpleRouter.get('/:id', async (req, res, next) => {
    try {
      const list = await olService.findYourOrder(req.params.id);
      res.status(200).send(list)
    } catch (error) {
      next(error)
    }
  });

  simpleRouter.delete('/:id', async (req, res) => {
    try {
      const add = await storeProductService.deleteDealer(req.params.id)
      console.log(add)
      res.status(201).send(add);
      
    } catch (error) {
      logger.debug(error)
    }
  })

  simpleRouter.put('/:id', async (req, res) => {
    try {
      const add = await userService.updateUser(req.params.id, req.body)
      console.log(add)
      res.status(201).send(add);
      
    } catch (error) {
      logger.debug(error)
      next(error)
    }
  })
}