const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const tarefa = (sequelize, DataTypes) => { 
    const Tarefa = sequelize.define('Tarefa', { 
        id: { 
            type: DataTypes.UUID, 
            defaultValue: DataTypes.UUIDV4, 
            primaryKey: true, 
        }, 
        nome: { 
            type: DataTypes.STRING, 
            allowNull: false, 
        }
    });

    return Tarefa; 
};

module.exports = tarefa; 