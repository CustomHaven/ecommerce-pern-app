const { DataTypes } = require('sequelize');

module.exports = (sequelize = require('sequelize')) => {
  const Order = sequelize.define('Order', {
    oid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    status_completed: {
      type: DataTypes.BOOLEAN
    },
    final_price: {
      type: DataTypes.DECIMAL(10, 2),
    }
  }, {
    tableName: 'orders',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    // paranoid: true
  })

  return Order;
}