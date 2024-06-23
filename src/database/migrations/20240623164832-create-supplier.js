'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('supplier_id', {})
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('supplier_id')
  },
}
