'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('cursos', [
      { nome: 'Curso de Programação' },
      { nome: 'Curso de Design' },
      { nome: 'Curso de Marketing' }
    ], {});

    await queryInterface.bulkInsert('estudantes', [
      { cpf: '12345678900', nome: 'Maria Silva', matricula: '2023001', cursoId: 1 },
      { cpf: '98765432100', nome: 'João Souza', matricula: '2023002', cursoId: 1 },
      { cpf: '12312312300', nome: 'Ana Costa', matricula: '2023003', cursoId: 2 },
      { cpf: '45645645600', nome: 'Lucas Mendes', matricula: '2023004', cursoId: 2 },
      { cpf: '78978978900', nome: 'Fernanda Lima', matricula: '2023005', cursoId: 3 }
    ], {});

    await queryInterface.bulkInsert('tarefas', [
      { nome: 'Estudo de Matemática' },
      { nome: 'Pesquisa de História' },
      { nome: 'Trabalho de Química' },
      { nome: 'Desenvolvimento de Software' },
      { nome: 'Apresentação de Projeto' }
    ], {});

    await queryInterface.bulkInsert('atividades', [
      {
        data: new Date('2024-10-05'),
        hora_agendamento_inicio: '08:00:00',
        hora_agendamento_termino: '09:00:00',
        hora_inicio: null,
        hora_termino: null,
        tarefaId: 1, 
        estudanteId: '12345678900' 
      },
      {
        data: new Date('2024-10-06'),
        hora_agendamento_inicio: '10:00:00',
        hora_agendamento_termino: '11:00:00',
        hora_inicio: null,
        hora_termino: null,
        tarefaId: 2, 
        estudanteId: '98765432100' 
      },
      {
        data: new Date('2024-10-07'),
        hora_agendamento_inicio: '14:00:00',
        hora_agendamento_termino: '15:00:00',
        hora_inicio: null,
        hora_termino: null,
        tarefaId: 3, 
        estudanteId: '12312312300' 
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
