const { DataTypes } = require('sequelize');
const sequelize = require("../config/sequelize");

const Tarefa = require('./tarefa');  
const Estudante = require('./estudante'); 

const Atividade = sequelize.define('atividade', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true, 
        primaryKey: true,
    },
    data: {
        type: DataTypes.DATE,  
        allowNull: false,
    },
    hora_agendamento_inicio: {
        type: DataTypes.TIME, 
        allowNull: false,
    },
    hora_agendamento_termino: {
        type: DataTypes.TIME,
        allowNull: false,
    },
    hora_inicio: {
        type: DataTypes.TIME, 
        allowNull: true,  
        defaultValue: null, 
    },
    hora_termino: {
        type: DataTypes.TIME, 
        allowNull: true, 
        defaultValue: null,  
    },
    tarefaId: {
        type: DataTypes.INTEGER, 
        references: {
            model: 'Tarefas',  
            key: 'id',
        },
        allowNull: false,
    },
    estudanteId: {
        type: DataTypes.STRING,  
        references: {
            model: 'Estudantes', 
            key: 'cpf',
        },
        allowNull: false,
    }
}, { 
    timestamps: false, 
});

// Relacionamento com Tarefa (muitos para um)
Atividade.belongsTo(Tarefa, { foreignKey: 'tarefaId' });
Tarefa.hasMany(Atividade, { foreignKey: 'tarefaId' });

// Relacionamento com Estudante (muitos para um)
Atividade.belongsTo(Estudante, { foreignKey: 'estudanteId' });
Estudante.hasMany(Atividade, { foreignKey: 'estudanteId' });



module.exports = Atividade;