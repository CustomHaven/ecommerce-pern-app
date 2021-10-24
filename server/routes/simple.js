const simpleRouter = require('express').Router();
const DealerProductService = require('../services/dealerProductService');
const DealerService = require('../services/dealerService');
const dealerService = new DealerService();
const dealerProductService = new DealerProductService();
const logger = require('../loggers');
const StoreProductService = require('../services/storeProductService');
const storeProductService = new StoreProductService();
const createError = require('http-errors');


module.exports = (app)=> {
  app.use('/hi', simpleRouter);

  simpleRouter.get('/', async (req, res) => {
    try {
      const all = await storeProductService.findAllDealers();

      res.status(200).send(all)
        
    } catch (error) {
      logger.log(error)
    }
  })

  simpleRouter.post('/', async (req, res, next) => {
    try {
      req.body.price = req.body.price !== undefined && parseFloat(req.body.price);
      req.body.quantity = parseInt(req.body.quantity);
      const add = await storeProductService.addStoreProduct(req.body)
      // console.log(add)
      res.status(201).send(add);
      
    } catch (error) {
      // console.log(error)
      next(error)
    }
  })

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
      const add = await storeProductService.updateDealer(req.params.id, req.body)
      console.log(add)
      res.status(201).send(add);
      
    } catch (error) {
      logger.debug(error)
    }
  })
}