const sequelize = require('../config/sequelize');
const Sequelize = require('sequelize');

const Curso = require('./curso'); 
const Estudante = require('./estudante');
const Tarefa = require('./tarefa');
const Atividade = require('./atividade');

const curso = new Curso(sequelize, Sequelize.DataTypes);
const estudante = new Estudante(sequelize, Sequelize.DataTypes);
const atividade = new Atividade(sequelize, Sequelize.DataTypes);
const tarefa = new Tarefa(sequelize, Sequelize.DataTypes);

const db = { 
    curso, 
    estudante,
    atividade,
    tarefa, 
    sequelize
}

module.exports = db;