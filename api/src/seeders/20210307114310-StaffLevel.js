'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('staffLevels', [{
      levelName: "Sl8",
      description: "This is Simply Grade 8",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      levelName: "Sl9",
      description: "This is Simply Grade 9",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      levelName: "Sl10",
      description: "This is Simply Grade 10, eligible to be a Line Manager",
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('staffLevels', null, {});
  }
};