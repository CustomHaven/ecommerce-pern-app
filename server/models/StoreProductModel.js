module.exports = (sequelize, DataTypes) => {
  // const { DataTypes } = Sequelize;
  const StoreProduct = sequelize.define('StoreProduct', {
    spid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    product_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    type: {
      type: DataTypes.STRING(25),
      allowNull: true,
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
      allowNull: false,
      validate: {
        customValidator(value) {
          if (value === null || value <= 0) {
            throw Error('Quantity value must be greater than 0')
          }
          return value
        }
      }
    }
  }, {
    tableName: 'store_products',
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
    // freezeTableName: true
    // paranoid: true
  });

  StoreProduct.addHook('beforeCreate', (record, options) => {
    record.dataValues.created_at = new Date().toISOString().replace(/T/, ' ').replace(/\..+/g, '');
    record.dataValues.updated_at = new Date().toISOString().replace(/T/, ' ').replace(/\..+/g, '');
  });
  StoreProduct.addHook('beforeUpdate', (record, options) => {
    record.dataValues.updated_at = new Date().toISOString().replace(/T/, ' ').replace(/\..+/g, '');
  });

  StoreProduct.associate = models => {
    StoreProduct.belongsTo(models.DealerProduct, {
      foreignKey: {
        type: DataTypes.UUID,
        allowNull: false,
        name: 'dealer_product_dpid'
      }
    });

    StoreProduct.belongsToMany(models.Customer, { 
      through: models.OrderList,
      unique: false,
      foreignKey: 'store_products_spid',
    });
  }

  return StoreProduct;
}