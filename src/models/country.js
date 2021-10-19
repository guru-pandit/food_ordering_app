'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Country extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({State}) {
      // define association here
      Country.hasMany(State, { foreignKey: "countryId" });
    }
  };
  Country.init({
    name: DataTypes.STRING,
    countryCode: DataTypes.STRING,
    currency: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Country',
  });
  return Country;
};