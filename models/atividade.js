const sequelize = require("../config/sequelize");
const { DataTypes } = require('sequelize');
const Tarefa = require('./tarefa');  
const Estudante = require('./estudante'); 

const Atividade = sequelize.define('Atividade', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4, 
        primaryKey: true,
    },
    data: {
        type: DataTypes.DATEONLY,  
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
    },
    hora_termino: {
        type: DataTypes.TIME, 
        allowNull: true,  
    },
    tarefaId: {
        type: DataTypes.UUID, 
        references: {
            model: 'Tarefas',  
            key: 'id',
        },
        allowNull: false,
    },
    estudanteId: {
        type: DataTypes.UUID,  
        references: {
            model: 'Estudantes', 
            key: 'id',
        },
        allowNull: false,
    }
});

// Relacionamento com Tarefa (muitos para um)
Atividade.belongsTo(Tarefa, { foreignKey: 'tarefaId' });
Tarefa.hasMany(Atividade, { foreignKey: 'tarefaId' });

// Relacionamento com Estudante (muitos para um)
Atividade.belongsTo(Estudante, { foreignKey: 'estudanteId' });
Estudante.hasMany(Atividade, { foreignKey: 'estudanteId' });



module.exports = Atividade;