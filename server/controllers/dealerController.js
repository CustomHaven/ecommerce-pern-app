const DealerService = require('../services/dealerService');
const dealerService = new DealerService();
const createError = require('http-errors');

exports.findAll = async (req, res, next) => {
  try {
    const dealer = await dealerService.findAllDealers();
    if (!dealer) {
      throw createError(404, 'No dealer/supplier found')
    }
    res.status(200).send(dealer);
  } catch (error) {
    next(error)
  }
}

exports.findADealer = async (req, res, next) => {
  try {
    //   console.log(req.params.id)
    const dealer = await dealerService.findDealer(req.params.id);
    if (!dealer) {
      throw createError(404, 'Dealer/Supplier was not found')
    }
    res.status(200).send(dealer)
  } catch (error) {
    next(error)
  }
}

exports.updateDealer = async (req, res, next) => {
  try {
    const dealer = await dealerService.updateDealer(req.params.id, req.body);
    if (!dealer) {
      throw createError(404, 'Update was unsuccessful because dealer/supplier was not found')
    }
    res.status(200).send(dealer)
  } catch (error) {
    next(error)
  }
}

exports.addDealer = async (req, res, next) => {
  try {
    const dealer = await dealerService.addDealer(req.body);
    res.status(201).send(dealer)
  } catch (error) {
    next(error)
  }
}

exports.removeDealer = async (req, res, next) => {
  try {
    const dealer = await dealerService.deleteDealer(req.params.id);
    if (!dealer) {
      throw createError(404, 'No dealer/supplier found to delete')
    }
    res.sendStatus(204);
  } catch (error) {
    next(error)
  }
}

/*findAllDealers()//
addDealer(data)//
findDealer(id)//
findByPrimaryKey(id)
updateDealer(id, data)
deleteDealer(id)//*/