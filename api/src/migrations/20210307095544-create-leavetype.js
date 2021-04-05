'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('leaveTypes', {
        id: {
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            type: Sequelize.INTEGER
        },
        type: {
            allowNull: false,
            type: Sequelize.STRING
        },
        code: {
            allowNull: false,
            type: Sequelize.STRING
        },
        isPreAllocated: {
            allowNull: false,
            type: Sequelize.BOOLEAN
        },
        maxDays: {
            allowNull: false,
            type: Sequelize.INTEGER
        },
        description: {
            type: Sequelize.STRING
        },
        createdAt: {
            allowNull: false,
            type: Sequelize.DATE
        },
        updatedAt: {
            allowNull: false,
            type: Sequelize.DATE
        }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('leaveTypes');
  }
};