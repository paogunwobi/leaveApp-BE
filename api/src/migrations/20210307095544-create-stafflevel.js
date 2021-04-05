'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('staffLevels', {
        "id": {
            "allowNull": false,
            "primaryKey": true,
            "autoIncrement": true,
            "field": "id",
            "seqType": "Sequelize.INTEGER"
        },
        "levelName": {
            "field": "levelName",
            "seqType": "Sequelize.STRING"
        },
        "description": {
            "field": "description",
            "seqType": "Sequelize.STRING"
        },
        "createdAt": {
            "allowNull": false,
            "field": "createdAt",
            "seqType": "Sequelize.DATE"
        },
        "updatedAt": {
            "allowNull": false,
            "field": "updatedAt",
            "seqType": "Sequelize.DATE"
        }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('staffLevels');
  }
};