'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Mealtype extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Menuitem}) {
      Mealtype.hasMany(Menuitem,{foreignKey:"mealtypeId"})
      // define association here
    }
  };
  Mealtype.init({
    name: DataTypes.STRING,
    content: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Mealtype',
  });
  return Mealtype;
};