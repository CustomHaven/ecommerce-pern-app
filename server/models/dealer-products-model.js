// const db = require('../db');
const { DataTypes } = require('sequelize');

module.exports = (sequelize = require('../db')) => {

  const DealerProduct = sequelize.define('DealerProduct', {
    dpid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    product_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
      // validate: {
      //   len: [1, 100]
      // }
    },
    type: {
      type: DataTypes.STRING(25),
      allowNull: true,
      // validate: {
      //   len: [1, 100]
      // }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'dealer_products',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    freezeTableName: true
    // paranoid: true
  })

  return DealerProduct;
}