'use strict'
const { Model } = require('sequelize')
const Nanoid = require('#helpers/Nanoid')
const Bcrypt = require('#helpers/Bcrypt')

module.exports = (sequelize, DataTypes) => {
  class staff extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
      staff.hasMany(models.attendance, { foreignKey: 'staff_id' })
    }
  }
  staff.init({
    staffId: {
      type: DataTypes.STRING,
      primaryKey: true,
      validate: {
        notEmpty: true
      },
      allowNull: false
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    image: {
      type: DataTypes.STRING
    },
    passwordHash: {
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'staff',
    tableName: 'staff',
    timestamps: true,
    underscored: false
  })

  staff.beforeCreate((instance) => {
    /**
     * use random placeholder if isLdap = true & password = null
     */
    if (!instance.passwordHash) {
      instance.passwordHash = Bcrypt.hash(Nanoid.get(15))
    }

    instance.passwordHash = Bcrypt.hash(instance.passwordHash)
  })

  staff.beforeValidate((instance) => {
    if (instance.staffId) return
    instance.staffId = Nanoid.get(15)
  })

  return staff
}
