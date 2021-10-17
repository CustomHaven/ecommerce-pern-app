module.exports = (sequelize, DataTypes) => {
  // const { DataTypes } = Sequelize;
  const Customer = sequelize.define('Customer', {
    cid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    first_name: {
      type: DataTypes.STRING(25),
    },
    last_name: {
      type: DataTypes.STRING(25),
    },
    address: {
      type: DataTypes.STRING(100),
      allowNull: false
    }, 
    zip_code: {
      type: DataTypes.STRING(25),
      allowNull: false      
    },
    city: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    country: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: false
    }
  }, {
    tableName: 'customers',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    // paranoid: true
  })

  Customer.associate = models => {
    Customer.belongsToMany(models.StoreProduct, { 
      through: models.OrderList,
      unique: false,
      foreignKey: 'customers_cid',
    });

    Customer.hasMany(models.Order, {
      foreignKey: {
        type: DataTypes.UUID,
        allowNull: false,
        name: 'customers_cid'
      }
    })
  }

  return Customer;
}