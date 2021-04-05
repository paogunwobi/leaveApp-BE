'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('departments', 
    {
        "id": {
            "allowNull": false,
            "primaryKey": true,
            "autoIncrement": true,
            "field": "id",
            "seqType": "Sequelize.INTEGER"
        },
        "name": {
            "field": "name",
            "seqType": "Sequelize.STRING"
        },
        "code": {
            "field": "code",
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
        },
        "lineManager": {
            "allowNull": true,
            "references": {
                "model": "staffs",
                "key": "id"
            },
            "onDelete": "SET NULL",
            "onUpdate": "CASCADE",
            "field": "lineManager",
            "seqType": "Sequelize.INTEGER"
        }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('departments');
  }
};