const sequelize = require("../config/sequelize");
const { DataTypes } = require('sequelize');
const Tarefa = require('./tarefa');  
const Estudante = require('./estudante'); 
const agendamento = (sequelize, DataTypes) => {
    const Agendamento = sequelize.define('Agendamento', {
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
    Agendamento.belongsTo(Tarefa, { foreignKey: 'tarefaId' });
    Tarefa.hasMany(Agendamento, { foreignKey: 'tarefaId' });

    // Relacionamento com Estudante (muitos para um)
    Agendamento.belongsTo(Estudante, { foreignKey: 'estudanteId' });
    Estudante.hasMany(Agendamento, { foreignKey: 'estudanteId' });

    return Agendamento;
};

module.exports = agendamento;