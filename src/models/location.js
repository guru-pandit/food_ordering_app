'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Location extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Restaurant}) {
      // define association here
      Location.hasMany(Restaurant,{foreignKey:"locationId"})
    }
  };
  Location.init({
    landmark: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    country: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Location',
  });
  return Location;
};