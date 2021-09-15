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
    stars: DataTypes.INTEGER,
    comment: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    restaurantId: DataTypes.INTEGER,
    commentedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Review',
  });
  return Review;
};