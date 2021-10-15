// const db = require('../db');
const { DataTypes } = require('sequelize');

module.exports = (sequelize = require('../db')) => {

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
      validate: {
        len: [1, 50]
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  }, {
    tableName: 'dealers',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    freezeTableName: true
    // paranoid: true
  })

  return Dealer;
}