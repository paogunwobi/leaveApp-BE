'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('staffs', {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER
      },
      firstName: {
          allowNull: false,
          type: Sequelize.STRING
      },
      lastName: {
          allowNull: false,
          type: Sequelize.STRING
      },
      email: {
          allowNull: false,
          type: Sequelize.STRING
      },
      password: {
          allowNull: false,
          type: Sequelize.STRING
      },
      phoneNumber: {
          allowNull: false,
          type: Sequelize.STRING
      },
      staffCode: {
          allowNull: false,
          type: Sequelize.STRING
      },
      eligible: {
          type: Sequelize.BOOLEAN
      },
      status: {
          allowNull: false,
          type: Sequelize.ENUM('ACTIVE', 'DISABLED', 'REMOVED')
      },
      role: {
          allowNull: false,
          type: Sequelize.ENUM('ADMIN', 'LINE-MANAGER', 'STAFF')
      },
      createdAt: {
          allowNull: false,
          type: Sequelize.DATE
      },
      updatedAt: {
          allowNull: false,
          field: updatedAt,
          type: Sequelize.DATE
      },
      departmentId: {
          allowNull: true,
          references: {
              model: departments,
              key: id
          },
          onUpdate: CASCADE,
          field: departmentId,
          type: Sequelize.INTEGER
      },
      staffLevelId: {
          allowNull: true,
          references: {
              model: staffLevels,
              key: id
          },
          onUpdate: CASCADE,
          type: Sequelize.INTEGER
      },
    //   staffId: {
    //       allowNull: true,
    //       references: {
    //           model: staffLevels,
    //           key: id
    //       },
    //       onDelete: SET NULL,
    //       onUpdate: CASCADE,
    //       type: Sequelize.INTEGER
    //   }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('staffs');
  }
};