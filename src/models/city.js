'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class City extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({State,Location}) {
      // define association here
      City.belongsTo(State, { foreignKey: "stateId" });
      City.hasMany(Location, { foreignKey: "cityId" })
    }
  };
  City.init({
    name: DataTypes.STRING,
    stateId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'City',
  });
  return City;
};