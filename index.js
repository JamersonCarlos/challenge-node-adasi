const express = require('express');
const app = express();
const port = 3000; // Variável ambiente 

// Importando as rotas referentes a cada objeto. 
const cursos = require('./api/cursos');
const estudantes = require('./api/estudantes');
const tarefas = require('./api/tarefas');
const atividades = require('./api/atividades');

app.use('/cursos', cursos);
app.use('/estudantes', estudantes);
app.use('/tarefas', tarefas);
app.use('/atividades', atividades);

app.listen(port, () => { 
    console.log(`App rodando na porta ${port}`);
});






