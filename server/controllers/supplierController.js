const SupplierService = require('../services/supplierService');
const supplierService = new SupplierService();
const createError = require('http-errors');
// change the entire controller for something relevant for Supplier, SupplierImage and SkuProduct Models! from supplierService

exports.deleteProduct = async (req, res, next) => {
  try {
    const removeProduct = await supplierService.deleteSupplier(req.params.id);
    if (!removeProduct) {
      throw createError(404, 'No product was found to delete');
    }
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
}

exports.deleteImage = async (req, res, next) => {
  try {
    const removeImage = await supplierService.deleteSupplierImage(req.params.id);
    if (!removeImage) {
      throw createError(404, 'No image was found to delete');
    }
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
}

exports.deleteSku = async (req, res, next) => {
  try {
    const removeSku = await supplierService.deleteSupplierSku(req.params.id);
    if (!removeSku) {
      throw createError(404, 'No sku was found to delete');
    }
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
}

exports.findTheProduct = async (req, res, next) => {
  try {
    const theProduct = await SupplierService.findNewProduct(req.params.id);
    if (!theProduct) {
      throw createError(404, 'Product was not found');
    }
    res.status(200).send(theProduct);
  } catch (error) {
    next(error);
  }
}

exports.addSupplier = async (req, res, next) => {
  try { 
    const supplier = await supplierService.createSupplier(req.body);
    if (!supplier) {
      throw createError(500, 'Failed to add the aliexpress product')
    }
    res.status(201).send(supplier);
  } catch (error) {
    next(error)
  }
}

exports.findAllAliProducts = async (req, res, next) => {
  try {
    const allAli = await supplierService.findAllSupplier();
    if (!allAli) {
      throw createError(404, 'No Aliexpress products found!');
    }
    res.status(200).send(allAli);
  } catch (error) {
    next(error);
  }
}

exports.updateProduct = async (req, res, next) => {
  try {
    const theUpdate = await supplierService.updateSupplier(req.params.id, req.body);
    if (!theUpdate) {
      throw createError(500, 'Could not update the product');
    }
    res.status(200).send(theUpdate);
  } catch (error) {
    next(error);
  }
}

exports.updateSku = async (req, res, next) => {
  try {
    const aliSku = await supplierService.updateSupplierSKU(req.params.pid, req.params.fid, req.body);
    if (!aliSku) {
      throw createError(500, 'Product not found');
    }
    res.status(200).send(aliSku);
  } catch (error) {
    next(error);
  }
}

exports.addImage = async (req, res, next) => {
  try {
    const aliImg = await supplierService.addSupplierImage(req.params.id, req.body.media_url);
    if (!aliImg) {
      throw createError(500, 'Failed to add image');
    }
    res.status(201).send(aliImg);
  } catch (error) {
    next(error);
  }
}