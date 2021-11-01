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
    // hooks: {
    //   beforeCreate(record, options) {
    //       record.dataValues.created_at = new Date().toISOString().replace(/T/, ' ').replace(/\..+/g, '');
    //       record.dataValues.updated_at = new Date().toISOString().replace(/T/, ' ').replace(/\..+/g, '');
    //   },
    //   beforeUpdate(record, options) {
    //       record.dataValues.updated_at = new Date().toISOString().replace(/T/, ' ').replace(/\..+/g, '');
    //   }
    // },
    charset: 'utf8',
    collate: 'utf8_general_ci'
    // paranoid: true
  });

  Order.addHook('beforeCreate', (record, options) => {
    record.dataValues.created_at = new Date().toISOString().replace(/T/, ' ').replace(/\..+/g, '');
    record.dataValues.updated_at = new Date().toISOString().replace(/T/, ' ').replace(/\..+/g, '');
  });
  Order.addHook('beforeUpdate', (record, options) => {
    record.dataValues.updated_at = new Date().toISOString().replace(/T/, ' ').replace(/\..+/g, '');
  });

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