const request = require('supertest');
const app = require('../index'); 

describe('Testes de endpoints dos Cursos', () => {
  describe('DELETE /cursos/:id', () => {
    it('Deve adicionar e excluir o curso de Engenharia Química', async () => {
      const createResponse = await request(app)
        .post('/cursos')
        .send({ nome: 'curso de Engenharia Química' });

      const id = createResponse.body.id;

      const response = await request(app)
        .delete(`/cursos/${id}`); 
      
      expect(createResponse.statusCode).toBe(201);
      expect(response.statusCode).toBe(200);
    });
  });

  describe('GET /cursos', () => {
    it('Deve listar todos os cursos', async () => {
      const response = await request(app)
        .get('/cursos');
      expect(response.statusCode).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  describe('PUT /cursos/:id', () => {
    it('Deve atualizar o curso', async () => {
      // Primeiro, cria um curso para atualizar
      const createResponse = await request(app)
        .post('/cursos')
        .send({ nome: 'curso de Engenharia de Controle e Automação' });

      const id = createResponse.body.id; 

      // Agora, atualiza o curso
      const updateResponse = await request(app)
        .put(`/cursos/${id}`)
        .send({ nome: 'curso de Engenharia de Software' }); 

      const response = await request(app)
        .delete(`/cursos/${id}`); 
      
      expect(response.statusCode).toBe(200);
      expect(response.body.message).toBe('Curso removido com sucesso');
      expect(updateResponse.statusCode).toBe(200); 
      expect(updateResponse.body.message).toBe('Curso atualizado com sucesso'); 
    }); 
  });
});

describe('Testes de endpoints dos Estudantes', () => {
  describe('CREATE DELETE UPDATE /estudantes/:id', () => {
      it('Deve adicionar, excluir e atualizar um estudante', async () => {

        //Crio um curso para o estudante  
        const createCursoResponse = await request(app)
          .post('/cursos')
          .send({ nome: 'curso de Engenharia Química' });
  
        const idCurso = createCursoResponse.body.id;

        //Crio um estudante com o curso criado 
        const createdEstudanteResponse = await request(app)
          .post('/estudantes') 
          .send({ cpf: "11895587425", nome: "jamerson carlos dos santos", matricula: "20932041", cursoId: idCurso})

        const idEstudante = createdEstudanteResponse.body.cpf; 

        //Atualizando registro 
        const updateEstudanteResponse = await request(app)
          .put(`/estudantes/${idEstudante}`)
          .send({ matricula: "21930314"});

        //Apagando registros
        const response_delete_estudante = await request(app)
          .delete(`/estudantes/${idEstudante}`)
          
        const response_delete_curso = await request(app)
          .delete(`/cursos/${idCurso}`); 
        
        expect(createCursoResponse.statusCode).toBe(201);
        expect(createdEstudanteResponse.statusCode).toBe(201);
        expect(response_delete_curso.statusCode).toBe(200);
        expect(response_delete_curso.body.message).toBe("Curso removido com sucesso");
        expect(response_delete_estudante.statusCode).toBe(200);
        expect(response_delete_estudante.body.message).toBe("Estudante removido com sucesso"); 
        expect(updateEstudanteResponse.statusCode).toBe(200);
        expect(updateEstudanteResponse.body.message).toBe("Estudante atualizado com sucesso")
      });
    });

    describe('GET /estudantes', () => {
      it('Deve listar todos os estudantes', async () => {
        const response = await request(app)
          .get('/estudantes');
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body.estudantes)).toBe(true);
      });
    });

});

describe('Testes de endpoints de Atividades', () => {

  describe('POST /atividades', () => {
      it('Não deve permitir que a duração da atividade ultrapasse 6 horas', async () => {
          const response = await request(app)
              .post('/atividades')
              .send({
                  data: new Date('2024-10-29'),
                  hora_agendamento_inicio: '12:00',
                  hora_agendamento_termino: '18:01', // 6 horas e 1 minuto
                  tarefaId: 1, 
                  estudanteId: '12345678900' 
              });

          expect(response.statusCode).toBe(409); 
          expect(response.body.message).toBe('A duração da atividade não pode ultrapassar 6 horas.');
      });

      it('Não deve permitir hora de término anteriores à hora de início', async () => {
          const response = await request(app)
              .post('/atividades')
              .send({
                  data:  new Date('2024-11-29'),
                  hora_agendamento_inicio: '13:00',
                  hora_agendamento_termino: '12:00',
                  tarefaId: 1,
                  estudanteId: '12345678900'
              });

          expect(response.statusCode).toBe(400);
          expect(response.body.message).toBe('hora de término no agendamento não podem ser anteriores à hora de início do agendamento.');
      });

      it('Não deve permitir data de agendamento anteriores à data de atual', async () => {
        const response = await request(app)
            .post('/atividades')
            .send({
                data:  new Date('2024-09-05'),
                hora_agendamento_inicio: '10:00',
                hora_agendamento_termino: '12:00',
                tarefaId: 1,
                estudanteId: '12345678900'
            });

        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe('data do agendamento não podem ser anterior a data atual.');
        
    }); 
    it('Deve negar a inicialização da atividade em outro dia diferente. ', async() => { 
        const response = await request(app)
          .post('/atividades/iniciar/1'); 

        expect(response.statusCode).toBe(400); 
        expect(response.body.message).toBe("Não é possivel iniciar atividade em outra data");
    });

    
  });
});