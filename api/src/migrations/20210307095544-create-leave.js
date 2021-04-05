'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('leaves', {
        id: {
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            type: Sequelize.INTEGER
        },
        code: {
            allowNull: false,
            type: Sequelize.STRING
        },
        totalLeaveDays: {
            allowNull: false,
            type: Sequelize.INTEGER
        },
        description: {
            type: Sequelize.STRING
        },
        status: {
            allowNull: false,
            type: Sequelize.ENUM('PENDING', 'APPROVED', 'ON-GOING', 'CANCELLED', 'COMPLETED', 'REJECTED')
        },
        leaveStartDate: {
            allowNull: false,
            type: Sequelize.STRING
        },
        leaveEndDate: {
            allowNull: false,
            type: Sequelize.STRING
        },
        resumptionDate: {
            allowNull: false,
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
        staffId: {
            allowNull: true,
            references: {
                model: staffs,
                key: id
            },
            onUpdate: CASCADE,
            type: Sequelize.INTEGER
        },
        approverId: {
            allowNull: true,
            references: {
                model: staffs,
                key: id
            },
            onUpdate: CASCADE,
            type: Sequelize.INTEGER
        },
        departmentId: {
            allowNull: true,
            references: {
                model: departments,
                key: id
            },
            onUpdate: CASCADE,
            type: Sequelize.INTEGER
        },
        leaveTypeId: {
            allowNull: true,
            references: {
                model: leaveTypes,
                key: id
            },
            onUpdate: CASCADE,
            type: Sequelize.INTEGER
        },
        // leaveId: {
        //     allowNull: true,
        //     references: {
        //         model: staffs,
        //         key: id
        //     },
        //     onDelete: CASCADE,
        //     onUpdate: CASCADE,
        //     field: leaveId,
        //     type: Sequelize.INTEGER
        // }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('leaves');
  }
};