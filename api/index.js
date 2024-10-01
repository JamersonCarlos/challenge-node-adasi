const express = require('express');
const router = express.Router();

const cursosRouter = require('./cursos');
const estudantesRouter = require('./estudantes');
const tarefasRouter = require('./tarefas');
const atividadesRouter = require('./atividades');

router.use('/cursos', cursosRouter);
router.use('/estudantes', estudantesRouter);
router.use('/tarefas', tarefasRouter);
router.use('/atividades', atividadesRouter);


module.exports = router; 