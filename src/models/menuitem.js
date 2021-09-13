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
    static associate({ Mealtype, Restaurant }) {
      // define association here
      Menuitem.belongsTo(Mealtype, { foreignKey: "mealtypeId" })
      Menuitem.belongsTo(Restaurant, { foreignKey: "restaurantId" })

    }
  };
  Menuitem.init({
<<<<<<< HEAD
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
      allowNull: false,
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
=======
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    image: DataTypes.JSON,
    price: DataTypes.INTEGER,
    restaurantId: DataTypes.INTEGER,
    mealtypeId: DataTypes.INTEGER
>>>>>>> 15b3699d7d6ebb07e269f3107143845421032a23
  }, {
    sequelize,
    modelName: 'Menuitem',
  });
  return Menuitem;
};