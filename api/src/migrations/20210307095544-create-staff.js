'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('staffs', {
      "id": {
        "allowNull": false,
        "primaryKey": true,
        "autoIncrement": true,
        "field": "id",
        "seqType": "Sequelize.INTEGER"
      },
      "firstName": {
          "field": "firstName",
          "seqType": "Sequelize.STRING"
      },
      "lastName": {
          "field": "lastName",
          "seqType": "Sequelize.STRING"
      },
      "email": {
          "field": "email",
          "seqType": "Sequelize.STRING"
      },
      "password": {
          "field": "password",
          "seqType": "Sequelize.STRING"
      },
      "phoneNumber": {
          "field": "phoneNumber",
          "seqType": "Sequelize.STRING"
      },
      "staffCode": {
          "field": "staffCode",
          "seqType": "Sequelize.STRING"
      },
      "eligible": {
          "field": "eligible",
          "seqType": "Sequelize.BOOLEAN"
      },
      "status": {
          "field": "status",
          "seqType": "Sequelize.ENUM('ACTIVE', 'DISABLED', 'REMOVED')"
      },
      "role": {
          "field": "role",
          "seqType": "Sequelize.ENUM('ADMIN', 'LINE-MANAGER', 'STAFF')"
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
      "departmentId": {
          "allowNull": true,
          "references": {
              "model": "departments",
              "key": "id"
          },
          "onDelete": "SET NULL",
          "onUpdate": "CASCADE",
          "field": "departmentId",
          "seqType": "Sequelize.INTEGER"
      },
      "staffLevelId": {
          "allowNull": true,
          "references": {
              "model": "staffLevels",
              "key": "id"
          },
          "onDelete": "SET NULL",
          "onUpdate": "CASCADE",
          "field": "staffLevelId",
          "seqType": "Sequelize.INTEGER"
      },
    //   "staffId": {
    //       "allowNull": true,
    //       "references": {
    //           "model": "staffLevels",
    //           "key": "id"
    //       },
    //       "onDelete": "SET NULL",
    //       "onUpdate": "CASCADE",
    //       "field": "staffId",
    //       "seqType": "Sequelize.INTEGER"
    //   }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('staffs');
  }
};