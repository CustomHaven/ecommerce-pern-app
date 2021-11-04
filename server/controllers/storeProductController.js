const StoreProductService = require('../services/storeProductService');
const storeProductService = new StoreProductService();
const createError = require('http-errors');

exports.findAll = async (req, res, next) => {
  try {
    const product = await storeProductService.findAllStoreProducts();
    if (!product) {
      throw createError(404, 'No products found')
    }
    res.status(200).send(product);
  } catch (error) {
    next(error)
  }
}

exports.findAStoreProduct = async (req, res, next) => {
  try {
    const product = await storeProductService.findStoreProduct(req.params.id);
    if (!product) {
      throw createError(404, 'Product not found')
    }
    res.status(200).send(product)
  } catch (error) {
    next(error)
  }
}

exports.updateStoreProduct = async (req, res, next) => {
  try {
    const product = await storeProductService.updateStoreProduct(req.params.id, req.body);
    if (!product) {
      throw createError(404, 'Update was unsuccessful because product was not found')
    }
    res.status(200).send(product)
  } catch (error) {
    next(error)
  }
}

exports.addStoreProduct = async (req, res, next) => {
  try {
    const product = await storeProductService.addStoreProduct(req.body);
    if (!product) {
      throw createError(500, 'Failed to add product')
    }
    res.status(201).send(product)
  } catch (error) {
    next(error)
  }
}

exports.removeStoreProduct = async (req, res, next) => {
  try {
    const product = await storeProductService.deleteStoreProduct(req.params.id);
    if (!product) {
      throw createError(404, 'Product was not found to delete')
    }
    res.sendStatus(204);
  } catch (error) {
    next(error)
  }
}