  
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
   await queryInterface.bulkInsert('leaves', [{
    code: 'leave001',
    totalLeaveDays: 10,
    description: "Seeded leave for John doe",
    leaveStartDate: "2021-05-03T00:00:00Z",
    leaveEndDate: "2021-05-14T00:00:00Z",
    resumptionDate: "2021-05-17T00:00:00Z",
    departmentId: 1,
    status: "PENDING",
    leaveTypeId: 1,
    staffId: 3,
    approverId: 1,
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
    departmentId: 1,
    status: "PENDING",
    leaveTypeId: 1,
    staffId: 4,
    approverId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
   }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('leaves', null, {});
  }
};