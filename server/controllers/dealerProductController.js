const DealerProductService = require('../services/dealerProductService');
const dealerProductService = new DealerProductService();
const createError = require('http-errors');

exports.findAll = async (req, res, next) => {
  try {
    const dealer = await dealerProductService.findAllDealerProducts();
    if (!dealer) {
      throw createError(404, 'No products found')
    }
    res.status(200).send(dealer);
  } catch (error) {
    next(error)
  }
}

exports.findADealerProduct = async (req, res, next) => {
  try {
    //   console.log(req.params.id)
    const dealer = await dealerProductService.findDealerProduct(req.params.id);
    if (!dealer) {
      throw createError(404, 'Product not found')
    }
    res.status(200).send(dealer)
  } catch (error) {
    next(error)
  }
}

exports.updateDealerProduct = async (req, res, next) => {
  try {
    const dealer = await dealerProductService.updateDealerProduct(req.params.id, req.body);
    if (!dealer) {
      throw createError(404, 'Update was unsuccessful because product was not found')
    }
    res.status(200).send(dealer)
  } catch (error) {
    next(error)
  }
}

exports.addDealerProduct = async (req, res, next) => {
  try {
    const dealer = await dealerProductService.addDealerProduct(req.body);
    res.status(201).send(dealer)
  } catch (error) {
    next(error)
  }
}

exports.removeDealerProduct = async (req, res, next) => {
  try {
    const dealer = await dealerProductService.deleteDealerProduct(req.params.id);
    if (!dealer) {
      throw createError(404, 'Product was not found to delete')
    }
    res.sendStatus(204);
  } catch (error) {
    next(error)
  }
}

/*findAllDealerProducts()//
addDealerProduct(data)//
findDealerProduct(id)//
findByPrimaryKey(id)
updateDealerProduct(id, data)//
deleteDealerProduct(id)//*/