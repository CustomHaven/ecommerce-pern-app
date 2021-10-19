module.exports = (sequelize, DataTypes) => {
  // const { DataTypes } = Sequelize;
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

  Order.associate = models => {
    Order.belongsTo(models.Customer, { 
      foreignKey: {
        type: DataTypes.UUID,
        allowNull: false,
        name: 'customers_cid'
      }
    });
  }

  return Order;
}