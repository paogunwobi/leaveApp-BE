'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('leaveType', [{
      type: "Annual Leave",
      code: 'leav001',
      isPreAllocated: false,
      maxDays: 20,
      description: 'Maximum of 20 working days for annual leave',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      type: "Sick Leave",
      code: 'leav002',
      isPreAllocated: false,
      maxDays: 10,
      description: 'Maximum of 10 working days for Sick leave without deductions',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      type: "Exam Leave",
      code: 'leav003',
      isPreAllocated: false,
      maxDays: 5,
      description: 'Maximum of 5 working days for Exam leave',
      createdAt: new Date(),
      updatedAt: new Date(),
    }])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('leaveType', null, {});
  }
};
