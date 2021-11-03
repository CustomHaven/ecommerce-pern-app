const CustomerService = require('../services/customerService');
const customerService = new CustomerService();
const createError = require('http-errors');

exports.findAll = async (req, res, next) => {
  try {
    const customer = await customerService.findAllCustomers();
    if (!customer) {
      throw createError(404, 'No customers found')
    }
    res.status(200).send(customer);
  } catch (error) {
    next(error)
  }
}

exports.findACustomer = async (req, res, next) => {
  try {
    //   console.log(req.params.id)
    const customer = await customerService.findCustomer(req.params.id);
    if (!customer) {
      throw createError(404, 'Customer not found')
    }
    res.status(200).send(customer)
  } catch (error) {
    next(error)
  }
}

exports.updateCustomer = async (req, res, next) => {
  try {
    const customer = await customerService.updateCustomer(req.params.id, req.body);
    if (!customer) {
      throw createError(404, 'Update was unsuccessful because customer was not found')
    }
    res.status(200).send(customer)
  } catch (error) {
    next(error)
  }
}

exports.addCustomer = async (req, res, next) => {
  try {
    const customer = await customerService.addCustomer(req.body);
    res.status(201).send(customer)
  } catch (error) {
    next(error)
  }
}

exports.removeCustomer = async (req, res, next) => {
  try {
    const customer = await customerService.deleteCustomer(req.params.id);
    if (!customer) {
      throw createError(404, 'No customer found to delete')
    }
    res.sendStatus(204);
  } catch (error) {
    next(error)
  }
}

/*findAllCustomers()
addCustomer(data)
findCustomer(id)
findByPrimaryKey(id)
updateCustomer(id, data)
deleteCustomer(id)//*/