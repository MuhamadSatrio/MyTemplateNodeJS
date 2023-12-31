'use strict'
const {
  Model
} = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class attendance extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
      attendance.belongsTo(models.staff, { foreignKey: 'staff_id' })
    }
  }
  attendance.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      validate: {
        notEmpty: true
      },
      allowNull: false,
      autoIncrement: true
    },
    staff_id: {
      type: DataTypes.STRING,
      allowNull: false
    },
    clock_in: {
      type: DataTypes.DATE,
      allowNull: false
    },
    clock_out: {
      type: DataTypes.DATE
    }
  }, {
    sequelize,
    modelName: 'attendance',
    tableName: 'attendance',
    timestamps: true,
    underscored: false
  })
  return attendance
}
