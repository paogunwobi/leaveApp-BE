'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('departments', [{
      name: "IT",
      code: "dept001",
      lineManagerId: 1,
      description: "This department is responsible for all Technology related activities of the Company",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "FINANCE",
      code: "dept002",
      lineManagerId: 1,
      description: "This department is responsible for all Finance related activities of the Company",
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('departments', null, {});
  }
};