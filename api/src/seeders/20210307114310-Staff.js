'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
    */
    await queryInterface.bulkInsert(
      'staffs',
      [{
        firstName: "Ogunwobi",
        lastName: "Philip",
        staffCode: 'egbin001',
        phoneNumber: '08123456789',
        email: "hr@egbin.com",
        role: "ADMIN",
        status: 'ACTIVE',
        eligible: false,
        departmentId: 1,
        staffLevel: 3,
        password:
          "$2y$10$Osrvxnndbn.xWI6qQTQslOBbhflRQM4zhXcZvn0YOHMhLdD5AXA1u",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: "Jane",
        lastName: "Doe",
        staffCode: 'egbin002',
        phoneNumber: '08153456789',
        email: "janedoe@egbin.com",
        role: "LINE-MANAGER",
        status: 'ACTIVE',
        eligible: true,
        departmentId: 1,
        staffLevel: 3,
        password:
          "$2y$10$Osrvxnndbn.xWI6qQTQslOBbhflRQM4zhXcZvn0YOHMhLdD5AXA1u",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: "John",
        lastName: "Doe",
        staffCode: 'egbin003',
        phoneNumber: '08123856789',
        email: "johndoe@egbin.com",
        role: "STAFF",
        status: 'ACTIVE',
        eligible: true,
        departmentId: 1,
        staffLevel: 1,
        password:
          "$2y$10$Osrvxnndbn.xWI6qQTQslOBbhflRQM4zhXcZvn0YOHMhLdD5AXA1u",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: "Stephen",
        lastName: "Doe",
        staffCode: 'egbin004',
        phoneNumber: '08124856789',
        email: "stephendoe@egbin.com",
        role: "STAFF",
        status: 'ACTIVE',
        eligible: true,
        departmentId: 1,
        staffLevel: 2,
        password:
          "$2y$10$Osrvxnndbn.xWI6qQTQslOBbhflRQM4zhXcZvn0YOHMhLdD5AXA1u",
        createdAt: new Date(),
        updatedAt: new Date(),
      }], {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('staffs', null, {})
  }
};
