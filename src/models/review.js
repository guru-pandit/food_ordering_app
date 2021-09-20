'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Restaurant,User}) {
      // define association here
      Review.belongsTo(Restaurant,{foreignKey:"restaurantId"})
      Review.belongsTo(User,{foreignKey:"userId"})
    }
  };
  Review.init({
    stars: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: { msg: "stars should not be empty" },
        isNumeric: { msg: "stars should be a number" }
      }
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: { msg: "comment should not be empty" },
      }
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: { msg: "userId should not be empty" },
      }
    },
    restaurantId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: { msg: "restaurantId should not be empty" },
      }
    },
    commentedAt: {
      type: DataTypes.DATE,
    },
  }, {
    sequelize,
    modelName: 'Review',
  });
  return Review;
};