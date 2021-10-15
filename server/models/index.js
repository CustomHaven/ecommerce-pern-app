const { DataTypes } = require('sequelize');
const User = require('./user-model');
const Dealer = require('./dealers-model');
const DealerProduct = require('./dealer-products-model');
const StoreProduct = require('./store-products-model');
const Customer = require('./customers-model');
const Order = require('./orders-model');

module.exports = async (sequelize = require('../db')) => {
  const user = User(sequelize);
  const dealer = Dealer(sequelize);
  const dealerProducts = DealerProduct(sequelize);
  const storeProduct = StoreProduct(sequelize);
  const customer = Customer(sequelize);
  const order = Order(sequelize);

  // Making Fkey inside dealerProducts and dealer is the Fkey
  dealer.hasOne(dealerProducts, {
    foreignKey: {
      type: DataTypes.UUID,
      allowNull: false,
      name: "dealers_did",
    }
  });

  dealerProducts.belongsTo(dealer, {
    foreignKey: {
      type: DataTypes.UUID,
      allowNull: false,
      name: "dealers_did",
    }
  });

  // Making Fkey inside storeProducts and dealerProducts is the Fkey
  dealerProducts.hasOne(storeProduct, {
    foreignKey: {
      type: DataTypes.UUID,
      allowNull: false,
      name: 'dealer_product_dpid'
    }
  })

  storeProduct.belongsTo(dealerProducts, {
    foreignKey: {
      type: DataTypes.UUID,
      allowNull: false,
      name: 'dealer_product_dpid'
    }
  });

  // Many-to-many relation between Customer and Store_products

  const OrderList = sequelize.define('OrderList', {
    quantity: {
      type: DataTypes.INTEGER
    },
    price: {
      type: DataTypes.DECIMAL(10, 2)
    }
  }, {
    tableName: 'order_list',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    // paranoid: true
  });

  customer.belongsToMany(storeProduct, { 
    through: OrderList,
    unique: false,
    foreignKey: 'customers_cid',
  });

  storeProduct.belongsToMany(customer, { 
    through: OrderList,
    unique: false,
    foreignKey: 'store_products_spid',
  });

  // One-To-Many relationship between customer and order

  customer.hasMany(order, {
    foreignKey: {
      type: DataTypes.UUID,
      allowNull: false,
      name: 'customers_cid'
    }
  })

  sequelize.sync({ alter: true }); //force: true

  return {
    user,
    dealer,
    dealerProducts,
    storeProduct,
    customer,
    OrderList,
    order
  }
}