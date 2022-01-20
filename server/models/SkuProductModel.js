module.exports = (sequelize, DataTypes) => {
  const SkuProduct = sequelize.define('SkuProduct', {
    skuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    type: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    sku_price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    sku_title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    sku_img: {
      type: DataTypes.STRING,
      allowNull: false
    },
    magnified_img: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'sku_products',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    charset: 'utf8',
    collate: 'utf8_general_ci'
    // freezeTableName: true
    // paranoid: true
  });

  SkuProduct.addHook('beforeCreate', (record, options) => {
    record.dataValues.created_at = new Date().toISOString().replace(/T/, ' ').replace(/\..+/g, '');
    record.dataValues.updated_at = new Date().toISOString().replace(/T/, ' ').replace(/\..+/g, '');
  });
  SkuProduct.addHook('beforeUpdate', (record, options) => {
    record.dataValues.updated_at = new Date().toISOString().replace(/T/, ' ').replace(/\..+/g, '');
  });

  SkuProduct.associate = models => {
    SkuProduct.belongsTo(models.AliProduct, { 
      foreignKey: {
        type: DataTypes.UUID,
        allowNull: false,
        name: "aliproduct_aid",
        onDelete: 'CASCADE',
        hooks: true
      }
    });
  };

  return SkuProduct;
}