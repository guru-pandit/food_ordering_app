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
    static associate({ Restaurant,City }) {
      // define association here
      Location.hasMany(Restaurant, { foreignKey: "locationId" })
      Location.belongsTo(City, { foreignKey: "cityId" });
    }
  };
  Location.init({
    landmark: DataTypes.STRING,
    cityId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Location',
  });
  return Location;
};