'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('leaveTypes', {
        "id": {
            "allowNull": false,
            "primaryKey": true,
            "autoIncrement": true,
            "field": "id",
            "seqType": "Sequelize.INTEGER"
        },
        "type": {
            "field": "type",
            "seqType": "Sequelize.STRING"
        },
        "code": {
            "field": "code",
            "seqType": "Sequelize.STRING"
        },
        "isPreAllocated": {
            "field": "isPreAllocated",
            "seqType": "Sequelize.BOOLEAN"
        },
        "maxDays": {
            "field": "maxDays",
            "seqType": "Sequelize.INTEGER"
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
    await queryInterface.dropTable('leaveTypes');
  }
};