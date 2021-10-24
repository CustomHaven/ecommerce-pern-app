const Models = require('../models');
const { DealerProduct, Dealer } = Models;

module.exports = class DealerProductService {
  
  async findAllDealerProducts() {
    try {
      const dealers = await DealerProduct.findAll();
      if (dealers) {
        return dealers
      }
      return null
    } catch (error) {
      throw error
    }
  }

  async addDealerProduct(data) {
    try {
      console.log('we are in dealer serv')
      const dealerId = await Dealer.findByPk(data.dealers_did)
      console.log('right below dealerId')
      if (!dealerId) {
        return null
      }
      const dealer = await DealerProduct.create({...data, dealers_did: dealerId.dataValues.did });
      if (dealer) {
        return dealer
      };
      return null
    } catch (error) {
      throw error
    }
  }

  async foundDealerProduct(id) {
    try {
      const dealer = await DealerProduct.findOne({ where: { dpid: id } });
      if (dealer) {
        return dealer
      }
      return null
    } catch (error) {
      throw error
    }
  }

  async findByPrimaryKey(id) {
    try {
      const dealer = await DealerProduct.findByPk(id);
      if (!dealer) {
        return null;
      }
      return dealer;
    } catch (error) {
      throw error
    }
  }

  async updateDealerProduct(id, data) {
    try {
      const dealer = await DealerProduct.findByPk(id)
      if (!dealer) {
        return null;
      }
      return await dealer.update(data);
    } catch (error) {
      throw error
    }
  }

  async deleteDealerProduct(id) {
    try {
      const dealer = await DealerProduct.destroy({ where: { dpid: id } });
      if (!dealer) {
        return null
      }
      return { message: "Successfully removed the dealer/supplier's product" }
    } catch (error) {
      throw error
    }
  }
}