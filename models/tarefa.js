const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');


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



module.exports = Tarefa; 