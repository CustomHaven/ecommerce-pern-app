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
      allowNull: false,
      unique: true
    }
  }, {
    indexes: [
      { 
        unique: true, 
        fields: ['email'] 
      },
    ],
    tableName: 'customers',
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

  Customer.addHook('beforeCreate', (record, options) => {
    record.dataValues.created_at = new Date().toISOString().replace(/T/, ' ').replace(/\..+/g, '');
    record.dataValues.updated_at = new Date().toISOString().replace(/T/, ' ').replace(/\..+/g, '');
    for (const key in record.dataValues) {
      if (typeof record.dataValues[key] === 'string' && key !== 'cid') {
        record.dataValues[key] = record.dataValues[key].toLowerCase()
      }
    }
  });
  Customer.addHook('beforeUpdate', (record, options) => {
    record.dataValues.updated_at = new Date().toISOString().replace(/T/, ' ').replace(/\..+/g, '');
    for (const key in record.dataValues) {
      if (typeof record.dataValues[key] === 'string' && key !== 'cid') {
        record.dataValues[key] = record.dataValues[key].toLowerCase()
      }
    }
  });

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