'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Token extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User }) {
      // define association here
      Token.belongsTo(User, { foreignKey: "userId" })
    }
  };
  Token.init({
    token: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    expiredAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Token',
  });
  return Token;
};