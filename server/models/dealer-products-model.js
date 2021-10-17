module.exports = (sequelize, DataTypes) => {
  // const { DataTypes } = Sequelize;
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
    // freezeTableName: true
    // paranoid: true
  });

  DealerProduct.associate = models => { // For starters this is the belongsTo association I would like to make my test for
    DealerProduct.belongsTo(models.Dealer, { 
      foreignKey: {
        type: DataTypes.UUID,
        allowNull: false,
        name: "dealers_did",
      }
    });

    DealerProduct.hasOne(models.StoreProduct, {
      foreignKey: {
        type: DataTypes.UUID,
        allowNull: false,
        name: 'dealer_product_dpid'
      }
    })
  };

  return DealerProduct;
}