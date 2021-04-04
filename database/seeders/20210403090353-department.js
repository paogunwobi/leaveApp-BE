'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('department', [{
      name: "IT",
      code: "dept001",
      lineManagerID: 1,
      description: "This department is responsible for all Technology related activities of the Company",
      staff: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "FINANCE",
      code: "dept002",
      lineManagerID: 1,
      description: "This department is responsible for all Finance related activities of the Company",
      createdAt: new Date(),
      updatedAt: new Date(),
    }])
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     */
    await queryInterface.bulkDelete('department', null, {});
  }
};
