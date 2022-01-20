module.exports = (sequelize, DataTypes) => {
  const AliProductImage = sequelize.define('AliProductImage', {
    apiid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    media_url: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    tableName: 'aliproducts_images',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    charset: 'utf8',
    collate: 'utf8_general_ci'
    // freezeTableName: true
    // paranoid: true
  });

  AliProductImage.addHook('beforeCreate', (record, options) => {
    record.dataValues.created_at = new Date().toISOString().replace(/T/, ' ').replace(/\..+/g, '');
    record.dataValues.updated_at = new Date().toISOString().replace(/T/, ' ').replace(/\..+/g, '');
  });
  AliProductImage.addHook('beforeUpdate', (record, options) => {
    record.dataValues.updated_at = new Date().toISOString().replace(/T/, ' ').replace(/\..+/g, '');
  });

  AliProductImage.associate = models => {
    AliProductImage.belongsTo(models.AliProduct, { 
      foreignKey: {
        type: DataTypes.UUID,
        allowNull: false,
        name: "aliproduct_aid",
				onDelete: 'CASCADE',
        hooks: true
      }
    });
  };

  return AliProductImage;
}