module.exports = (sequelize, DataTypes) => {
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

  return OrderList;
}