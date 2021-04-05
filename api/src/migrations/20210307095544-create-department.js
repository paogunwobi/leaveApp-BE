'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('departments', 
    {
        id: {
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            type: Sequelize.INTEGER
        },
        name: {
            allowNull: false,
            type: Sequelize.STRING
        },
        code: {
            allowNull: false,
            type: Sequelize.STRING
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
        },
        lineManager: {
            allowNull: true,
            references: {
                model: staffs,
                key: id
            },
            onUpdate: CASCADE,
            type: Sequelize.INTEGER
        }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('departments');
  }
};