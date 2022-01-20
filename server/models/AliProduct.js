module.exports = (sequelize, DataTypes) => {
	const AliProduct = sequelize.define('AliProduct', {
		aid: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			allowNull: false,
			primaryKey: true
		},
		product_name: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		description: {
			type: DataTypes.TEXT,
			allowNull: true,
		},
    ali_url: {
      type: DataTypes.STRING,
      allowNull: true
    }
	}, {
		tableName: 'aliproducts',
		timestamps: true,
		createdAt: 'created_at',
		updatedAt: 'updated_at',
		charset: 'utf8',
		collate: 'utf8_general_ci'
		// freezeTableName: true
		// paranoid: true
	});

	AliProduct.addHook('beforeCreate', (record, options) => {
		record.dataValues.created_at = new Date().toISOString().replace(/T/, ' ').replace(/\..+/g, '');
		record.dataValues.updated_at = new Date().toISOString().replace(/T/, ' ').replace(/\..+/g, '');
	});
	AliProduct.addHook('beforeUpdate', (record, options) => {
		record.dataValues.updated_at = new Date().toISOString().replace(/T/, ' ').replace(/\..+/g, '');
	});

	AliProduct.associate = models => {
		AliProduct.hasMany(models.AliProductImage, { 
			foreignKey: {
				type: DataTypes.UUID,
				allowNull: false,
				name: "aliproduct_aid",
				onDelete: 'CASCADE',
				hooks: true
			}
		});
		AliProduct.hasMany(models.SkuProduct, { 
			foreignKey: {
				type: DataTypes.UUID,
				allowNull: false,
				name: "aliproduct_aid",
				onDelete: 'CASCADE',
				hooks: true
			}
		});
	};

	return AliProduct;
};