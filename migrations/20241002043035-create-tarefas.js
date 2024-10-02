'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('tarefas', {
      id: { 
        type: Sequelize.INTEGER, 
        autoIncrement: true, 
        primaryKey: true, 
      }, 
      nome: { 
          type: Sequelize.STRING, 
          allowNull: false, 
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('tarefas');
  }
};
