'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class passwordToken extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User }) {
      // define association here
      passwordToken.belongsTo(User, { foreignKey: "userId" })
    }
  };
  passwordToken.init({
    token: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    isUsed: DataTypes.BOOLEAN,
    expiredAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'passwordToken',
  });
  return passwordToken;
};