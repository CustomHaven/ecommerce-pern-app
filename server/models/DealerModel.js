const moment = require('moment');
const Sequelize = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  // const { DataTypes } = Sequelize;
  const Dealer = sequelize.define('Dealer', {
    did: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      // set(value) {
      //   return value.toLowerCase()
      // },
      validate: {
        len: [1, 50]
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    // created_at: {
    //   allowNull: false,
    //   type: DataTypes.DATE,
    //   // defaultValue: sequelize.NOW,
    //   get() {
    //     return moment(this.dataValues.created_at).format('D MM YYYY HH:mm:ss')
    //   },
    //   set(value) {
    //     console.log(this.dataValues.created_at)
    //     return moment(value).format('D MM YYYY HH:mm:ss')
    //   }
    // },
    // updated_at: {
    //   allowNull: false,
    //   type: DataTypes.DATE,
    //   // defaultValue: sequelize.NOW,
    //   get() {
    //     return moment(this.dataValues.updated_at).format('D MM YYYY HH:mm:ss')
    //   },
    //   set(value) {
    //     console.log(this.dataValues.created_at)
    //     return moment(value).format('D MM YYYY HH:mm:ss')
    //   }
    // },
  }, {
    tableName: 'dealers',
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

  Dealer.addHook('beforeCreate', (record, options) => {
    record.dataValues.created_at = new Date().toISOString().replace(/T/, ' ').replace(/\..+/g, '');
    record.dataValues.updated_at = new Date().toISOString().replace(/T/, ' ').replace(/\..+/g, '');
  });
  Dealer.addHook('beforeUpdate', (record, options) => {
    record.dataValues.updated_at = new Date().toISOString().replace(/T/, ' ').replace(/\..+/g, '');
  });

  Dealer.associate = models => {
    Dealer.hasOne(models.DealerProduct, { 
      foreignKey: {
        type: DataTypes.UUID,
        allowNull: false,
        name: "dealers_did",
      }
    });
  };

  return Dealer;
}