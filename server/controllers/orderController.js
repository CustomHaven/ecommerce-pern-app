const OLService = require('../services/orderListService');
const olService = new OLService();
const createError = require('http-errors');

exports.findAllOrders = async (req, res, next) => {
  try {
    const order = await olService.findAllOrders();
    if (!order) {
      throw createError(404, 'No order found')
    }
    res.status(200).send(order);
  } catch (error) {
    next(error)
  }
}

exports.findAllOrderList = async (req, res, next) => {
  try {
    const order = await olService.findAllOrderList();
    if (!order) {
      throw createError(404, 'No ordered items found')
    }
    res.status(200).send(order);
  } catch (error) {
    next(error)
  }
}

exports.findYourOrder = async (req, res, next) => {
  try {
    const order = await olService.findYourOrder(req.params.id)
    if (!order) {
      throw createError(500, 'No cart list or order found')
    }
    res.status(200).send(order);
  } catch (error) {
    next(error)
  }
}

exports.addOrder = async (req, res, next) => { //careful here many different errors can be thrown so check 
  try { // if we capture all different errors
    const order = await olService.addOrderList(req.body);
    if (!order) {
      throw createError(500, 'Failed to add order')
    }
    res.status(201).send(order)
  } catch (error) {
    next(error)
  }
}