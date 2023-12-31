'use strict'
const { staff: Staff } = require('#models')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await Staff.create({
      username: 'staff1',
      firstName: 'dummy',
      lastName: 'dummy',
      email: 'staff1@test.com',
      passwordHash: 'tes12345'
    })
  },

  async down (queryInterface, Sequelize) {
  }
}
