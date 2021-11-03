const Models = require('../models');
const { Dealer } = Models;

module.exports = class DealerService {
  
  async findAllDealers() {
    try {
      const dealers = await Dealer.findAll();
      if (dealers) {
        return dealers
      }
      return null
    } catch (error) {
      throw error
    }
  }

  async addDealer(data) {
    try {
      const dealer = await Dealer.create(data);
      if (dealer) {
        return dealer
      };
      return null
    } catch (error) {
      throw error
    }
  }

  async findDealer(id) {
    try {
      const dealer = await Dealer.findOne({ where: { did: id } });
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
      const dealer = await Dealer.findByPk(id);
      if (!dealer) {
        return null;
      }
      return dealer;
    } catch (error) {
      throw error
    }
  }

  async updateDealer(id, data) {
    try {
      const dealer = await Dealer.findByPk(id)
      if (!dealer) {
        return null;
      }
      return await dealer.update(data);
    } catch (error) {
      throw error
    }
  }

  async deleteDealer(id) {
    try {
      const dealer = await Dealer.destroy({ where: { did: id } });
      if (!dealer) {
        return null
      }
      return { message: 'Successfully removed the dealer/supplier' }
    } catch (error) {
      throw error
    }
  }
}