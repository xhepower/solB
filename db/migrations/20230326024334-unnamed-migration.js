'use strict';
const { CLIENTE_TABLE } = require('./../models/cliente.model');
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn(CLIENTE_TABLE, 'identidad', {
      type: Sequelize.DataTypes.STRING,
      unique: false,
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn(CLIENTE_TABLE, 'identidad', {
      type: Sequelize.DataTypes.STRING,
      unique: true,
      allowNull: false,
    });
  },
};
