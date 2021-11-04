module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    uid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      lowercase: true,
      // set(value) {
      //   return value.toLowerCase()
      // },
      // get() {
      //   return this.dataValues.email
      // },
      validate: {
        isEmail: true,
        notEmpty: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    is_admin: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    first_name: {
      type: DataTypes.STRING,
    },
    last_name: {
      type: DataTypes.STRING,
    },
    google_id: {
      type: DataTypes.STRING,
      defaultValue: null
    },
    facebook_id: {
      type: DataTypes.STRING,
      defaultValue: null
    }
  }, {
    indexes: [
      { 
        unique: true, 
        fields: ['email'] 
      },
    ],
    tableName: 'users',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    // hooks: {
    //   beforeCreate: (record, options) => {
    //       record.dataValues.created_at = new Date().toISOString().replace(/T/, ' ').replace(/\..+/g, '');
    //       record.dataValues.updated_at = new Date().toISOString().replace(/T/, ' ').replace(/\..+/g, '');
    //   },
    //   beforeUpdate: (record, options) => {
    //       record.dataValues.updated_at = new Date().toISOString().replace(/T/, ' ').replace(/\..+/g, '');
    //   }
    // },
    charset: 'utf8',
    collate: 'utf8_general_ci'
    // paranoid: true
  })
  User.addHook('beforeCreate', (record, options) => {
    record.dataValues.created_at = new Date().toISOString().replace(/T/, ' ').replace(/\..+/g, '');
    record.dataValues.updated_at = new Date().toISOString().replace(/T/, ' ').replace(/\..+/g, '');
    for (const key in record.dataValues) {
      if (typeof record.dataValues[key] === 'string' && key !== 'uid' && key !== 'password') {
        record.dataValues[key] = record.dataValues[key].toLowerCase()
      }
    }
  });
  User.addHook('beforeUpdate', (record, options) => {
    record.dataValues.updated_at = new Date().toISOString().replace(/T/, ' ').replace(/\..+/g, '');
    for (const key in record.dataValues) {
      if (typeof record.dataValues[key] === 'string' && key !== 'uid' && key !== 'password') {
        record.dataValues[key] = record.dataValues[key].toLowerCase()
      }
    }
  });
  return User;
}