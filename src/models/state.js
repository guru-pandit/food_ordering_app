'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class State extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({City,Country}) {
      // define association here
      State.hasMany(City, { foreignKey: "stateId" });
      State.belongsTo(Country, { foreignKey: "countryId" });
    }
  };
  State.init({
    name: DataTypes.STRING,
    countryId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'State',
  });
  return State;
};