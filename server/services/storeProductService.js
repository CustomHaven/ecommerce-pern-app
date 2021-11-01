const Models = require('../models');
const { StoreProduct, DealerProduct } = Models;
const createError = require('http-errors');

module.exports = class StoreProductService {
  
  async findAllStoreProducts() {
    try {
      const products = await StoreProduct.findAll();
      if (products) {
        return products
      }
      return null
    } catch (error) {
      throw error
    }
  }

  async addStoreProduct(data) {
    try {
      const dealerId = await DealerProduct.findByPk(data.dealer_product_dpid)
      if (!dealerId) {
        // throw Error("Dealer/Supplier was not found")
        // throw createError(404, "Dealer/Supplier was not found")
        return null
      }
      await dealerId.update({
        quantity: parseInt(dealerId.dataValues.quantity - data.quantity)
      })
      const product = await StoreProduct.create({
        ...data,
        price: !data.price ? parseFloat(dealerId.dataValues.price * 3).toFixed(2) : data.price,
        dealer_product_dpid: dealerId.dataValues.dpid 
      });
      if (product) {
        return product
      };
      return null
    } catch (error) {
      if (error.message === 'Validation error: Quantity value must be greater than 0') {
        error.message = error.message.replace(/\w{10}\s\w{5}:\s/gi, '');
        error.status = 406
        throw error
      }
      throw error
    }
  }

  async foundStoreProduct(id) {
    try {
      const product = await StoreProduct.findOne({ where: { spid: id } });
      if (product) {
        return product
      }
      return null
    } catch (error) {
      throw error
    }
  }

  async findByPrimaryKey(id) {
    try {
      const product = await StoreProduct.findByPk(id);
      if (!product) {
        return null;
      }
      return product;
    } catch (error) {
      throw error
    }
  }

  async updateStoreProduct(id, data) {
    try {
      const product = await StoreProduct.findByPk(id)
      if (!product) {
        return null;
      }
      return await product.update(data);
    } catch (error) {
      throw error
    }
  }

  async deleteStoreProduct(id) {
    try {
      const product = await StoreProduct.destroy({ where: { spid: id } });
      if (!product) {
        return null
      }
      return { message: "Successfully removed the product" }
    } catch (error) {
      throw error
    }
  }
}