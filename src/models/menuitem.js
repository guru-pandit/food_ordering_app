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
    static associate({ Mealtype, Restaurant,Cuisine }) {
      // define association here
      Menuitem.belongsTo(Mealtype, { foreignKey: "mealtypeId" })
      Menuitem.belongsTo(Restaurant, { foreignKey: "restaurantId" })
      Menuitem.belongsTo(Cuisine, { foreignKey: "cuisineId" })

    }
  };
  Menuitem.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Name should not be empty" },
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Description should not be empty" }
      }
    },
    image: {
      type: DataTypes.JSON,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Price should not be empty" },
        isNumeric: { msg: "Price should be a number" }
      }
    },
    restaurantId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Please select a restaurant" }
      }
    },
    mealtypeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Please select a meal type" }
      }
    },
    cuisineId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Please select a cuisine" }
      }
    },
  }, {
    sequelize,
    modelName: 'Menuitem',
  });
  return Menuitem;
};