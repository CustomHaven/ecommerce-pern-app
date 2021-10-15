const { DataTypes } = require('sequelize');

module.exports = (sequelize = require('sequelize')) => {
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

  return Customer;
}