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
    },
    facebook_id: {
      type: DataTypes.STRING,
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
    // paranoid: true
  })

  return User;
}