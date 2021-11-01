const Models = require('../models');
const { StoreProduct, Customer, OrderList, Order, Sequelize } = Models;
const createError = require('http-errors');
const moment = require('moment');

module.exports = class OLService {

  static upper(date) {
    const copy = date;
    const upper = moment(copy, 'YYYY-MM-DD HH:mm:ss')
                    .add(3, 'minutes');
    
    const upperBound = upper.toISOString(true).replace(/\.\d+\+\d+\:\d+/, '').replace(/T/, ' ');
    return upperBound;
  }

  static lower(date) {
    const copy = date;
    const lower = moment(copy, 'YYYY-MM-DD HH:mm:ss')
                    .subtract(3, 'minutes');

    const lowerBound = lower.toISOString(true).replace(/\.\d+\+\d+\:\d+/, '').replace(/T/, ' ');
    return lowerBound;
  }
  
  async findAllOrders() {
    try {
      const order = await Order.findAll();
      if (order) {
        return order
      }
      return null
    } catch (error) {
      throw error
    }
  }

  async findAllOrderList() {
    try {
      const order = await OrderList.findAll();
      if (order) {
        return order
      }
      return null
    } catch (error) {
      throw error
    }
  }

  async findYourOrder(id) {
    try {
      const order = await Order.findOne({
        where: {
          oid: id
        }
      });
      if (!order) {
        throw createError(404, 'Order not found')
      }
      const lowerBound = OLService.lower(order.dataValues.created_at);
      const upperBound = OLService.upper(order.dataValues.created_at);

      const orderList = await Customer.findAll({
        where: {
          cid: order.dataValues.customers_cid
        },
        include: [{
          model: StoreProduct,
          through: {
            [Sequelize.Op.between]: [lowerBound, upperBound],
            as: OrderList.name
          }
        }]
      });
      if (orderList) {
        return orderList.concat(order)
      }
      return null
    } catch (error) {
      throw error
    }
  }

  async addOrderList(data) {
    try {
      const storeId = await Promise.all(data.map(model => StoreProduct.findByPk(model.store_products_spid)))
      if (storeId.includes(null)) {
        throw createError(404, 'Item not found');
      }      
      const customerId = await Promise.all(data.map(model => Customer.findByPk(model.customers_cid)))
      if (customerId.includes(null)) {
        throw createError(404, 'Customer not found');
      }
      // storeId.update()

      await storeId.map(store => {
        const item = data.find(dd => dd.store_products_spid === store.dataValues.spid)
        return store.update({ 
          quantity: parseInt(store.dataValues.quantity - item.quantity)
        })
      });

      const ols = data.map(col => ({
        ...col,
        price: parseFloat(storeId.map(store => 
          store.dataValues.spid === col.store_products_spid &&
            parseFloat(parseFloat(store.dataValues.price * col.quantity).toFixed(2))
        ).join('').replace(/false/g, ''))
      }))
      // console.log(ols)
      const finalPrice = ols.map(ol => ol.price);

      const orderList = await Promise.all(ols.map(service => OrderList.create(service)))
      const order = await Order.create({        
        status_completed: true,
        final_price: finalPrice.reduce((acc, curr) => acc + curr),
        customers_cid: customerId.find(cus => cus.dataValues.cid).dataValues.cid
      })

      const final = orderList.concat(order)

      return final;

    } catch (error) {
      if (error.message === 'Validation error: Quantity value must be greater than 0') {
        error.message = error.message.replace(/\w{10}\s\w{5}:\s/gi, '');
        error.status = 406
        throw error
      }
      throw error
    }
  }

  async findByPrimaryKey(id) {
    try {
      const order = await Order.findByPk(id);
      if (!order) {
        return null;
      }
      return order;
    } catch (error) {
      throw error
    }
  }

  // async updateOrderList(id, data) {
  //   try {
  //     const order = await OrderList.findByPk(id)
  //     if (!order) {
  //       return null;
  //     }
  //     return await order.update(data);
  //   } catch (error) {
  //     throw error
  //   }
  // }
}