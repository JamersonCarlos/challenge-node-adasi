'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('estudantes', { 
      cpf: { 
        type: Sequelize.STRING, 
        allowNull: false, 
        unique: true,
        primaryKey: true, 
      }, 
      nome: { 
          type: Sequelize.STRING, 
          allowNull: false, 
      },
      matricula: { 
          type: Sequelize.STRING, 
          allowNull: false, 
          unique: true, 
      },
      cursoId: { 
          type: Sequelize.INTEGER, 
          references: { 
              model: 'cursos',
              key: 'id',
          }, 
          allowNull: false, 
          onUpdate: 'CASCADE', 
          onDelete: 'CASCADE',
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('estudantes');
  }
};
