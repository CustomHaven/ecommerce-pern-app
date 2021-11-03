const Models = require('../models');
const { Customer } = Models;

module.exports = class CustomerService {
  
  async findAllCustomers() {
    try {
      const customers = await Customer.findAll();
      if (customers) {
        return customers
      }
      return null
    } catch (error) {
      throw error
    }
  }

  async addCustomer(data) {
    try {
      const customer = await Customer.create(data);
      if (customer) {
        return customer
      };
      return null
    } catch (error) {
      throw error
    }
  }

  async findCustomer(id) {
    try {
      const customer = await Customer.findOne({ where: { cid: id } });
      if (customer) {
        return customer
      }
      return null
    } catch (error) {
      throw error
    }
  }

  async findByPrimaryKey(id) {
    try {
      const customer = await Customer.findByPk(id);
      if (!customer) {
        return null;
      }
      return customer;
    } catch (error) {
      throw error
    }
  }

  async updateCustomer(id, data) {
    try {
      const customer = await Customer.findByPk(id)
      if (!customer) {
        return null;
      }
      return await customer.update(data);
    } catch (error) {
      throw error
    }
  }

  async deleteCustomer(id) {
    try {
      const customer = await Customer.destroy({ where: { cid: id } });
      if (!customer) {
        return null
      }
      return { message: 'Successfully removed the customer' }
    } catch (error) {
      throw error
    }
  }
}