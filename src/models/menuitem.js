'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Menuitem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Mealtype,Restaurant}) {
       // define association here
      Menuitem.belongsTo(Mealtype,{foreignKey:"mealtypeId"})
      Menuitem.belongsTo(Restaurant,{foreignKey:"restaurantId"})
     
    }
  };
  Menuitem.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    image: DataTypes.STRING,
    price: DataTypes.INTEGER,
    restaurantId: DataTypes.INTEGER,
    mealtypeId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Menuitem',
  });
  return Menuitem;
};