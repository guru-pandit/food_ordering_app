'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Restaurant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Location,Menuitem}) {
       // define association here
      Restaurant.belongsTo(Location,{foreignKey:"locationId"})
      Restaurant.hasMany(Menuitem,{foreignKey:"restaurantId"})
    }
  };
  Restaurant.init({
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    contact: DataTypes.STRING,
    locationId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Restaurant',
  });
  return Restaurant;
};