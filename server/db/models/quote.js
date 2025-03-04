'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Quote extends Model {
   
    static associate(models) {
 Quote.belongsTo(models.Author, { foreignKey: "authorId" });
    }
  }
  Quote.init({
    authorId: DataTypes.INTEGER,
    quote: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Quote',
  });
  return Quote;
};