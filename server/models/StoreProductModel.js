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
      // validate: {
      //   len: [1, 100]
      // }
    },
    type: {
      type: DataTypes.STRING(25),
      allowNull: true,
    //   validate: {
    //     len: [1, 100]
    //   }
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
    tableName: 'store_products',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    // freezeTableName: true
    // paranoid: true
  })

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