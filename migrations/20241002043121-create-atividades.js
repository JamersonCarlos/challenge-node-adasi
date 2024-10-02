'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('atividades', { 
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true, 
        primaryKey: true,
      },
      data: {
          type: Sequelize.DATE,  
          allowNull: false,
      },
      hora_agendamento_inicio: {
          type: Sequelize.TIME, 
          allowNull: false,
      },
      hora_agendamento_termino: {
          type: Sequelize.TIME,
          allowNull: false,
      },
      hora_inicio: {
          type: Sequelize.TIME, 
          allowNull: true,  
          defaultValue: null, 
      },
      hora_termino: {
          type: Sequelize.TIME, 
          allowNull: true, 
          defaultValue: null,  
      },
      tarefaId: {
        type: Sequelize.INTEGER, 
        allowNull: false,
        references: {
          model: 'tarefas', 
          key: 'id',         
        },
        onUpdate: 'CASCADE',  
        onDelete: 'CASCADE',  
      },
      estudanteId: {
        type: Sequelize.STRING,  
        allowNull: false,
        references: {
          model: 'estudantes', 
          key: 'cpf',         
        },
        onUpdate: 'CASCADE', 
        onDelete: 'CASCADE',   
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('atividades');
  }
};
