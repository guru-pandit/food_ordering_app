'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Restaurant }) {
      // define association here
      Order.belongsTo(User, { foreignKey: "userId" });
      Order.belongsTo(Restaurant, { foreignKey: "restaurantId" });
    }
  };
  Order.init({
    items: DataTypes.JSON,
    userId: DataTypes.INTEGER,
    restaurantId: DataTypes.INTEGER,
    total: DataTypes.INTEGER,
    isDelivered: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};