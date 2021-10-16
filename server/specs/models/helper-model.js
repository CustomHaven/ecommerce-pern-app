const db = require('../../db');
const { DataTypes } = require('sequelize');
const Model = require('../../models');

module.exports = async () => {
  const model = await Model(db, DataTypes)
  const Models = model.sequelize.models

  return Models()
}/*
{
  User: User,
  Dealer: Dealer,
  DealerProduct: DealerProduct,
  StoreProduct: StoreProduct,
  Customer: Customer,
  Order: Order,
  OrderList: OrderList
}
*/