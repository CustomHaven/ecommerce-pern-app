const createError = require('http-errors');

function CustomException(message, cause) {
  const error = new Error(message);
  // Object.assign(error, {code: error.value})
  error.push({code: 404})
  return error;
}

CustomException.prototype = Object.create(Error.prototype);

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
    tableName: 'dealer_products',
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

  DealerProduct.addHook('beforeCreate', (record, options) => {
    record.dataValues.created_at = new Date().toISOString().replace(/T/, ' ').replace(/\..+/g, '');
    record.dataValues.updated_at = new Date().toISOString().replace(/T/, ' ').replace(/\..+/g, '');
  });
  DealerProduct.addHook('beforeUpdate', (record, options) => {
    record.dataValues.updated_at = new Date().toISOString().replace(/T/, ' ').replace(/\..+/g, '');
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