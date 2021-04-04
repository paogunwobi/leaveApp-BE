'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
   await queryInterface.bulkInsert('leave', [{
    code: 'leave001',
    totalLeaveDays: 10,
    description: "Seeded leave for John doe",
    leaveStartDate: "2021-05-03T00:00:00Z",
    leaveEndDate: "2021-05-14T00:00:00Z",
    resumptionDate: "2021-05-17T00:00:00Z",
    department: 1,
    status: "PENDING",
    leaveType: 1,
    staff: 3,
    approver: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
   },
   {
    code: 'leave002',
    totalLeaveDays: 10,
    description: "Seeded leave for Stephen doe",
    leaveStartDate: "2021-05-03T00:00:00Z",
    leaveEndDate: "2021-05-14T00:00:00Z",
    resumptionDate: "2021-05-17T00:00:00Z",
    department: 1,
    status: "PENDING",
    leaveType: 1,
    staff: 4,
    approver: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
   }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('leave', null, {});
  }
};
