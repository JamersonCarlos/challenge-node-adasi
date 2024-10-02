const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');


const Tarefa = sequelize.define('tarefa', { 
    id: { 
        type: DataTypes.INTEGER, 
        autoIncrement: true, 
        primaryKey: true, 
    }, 
    nome: { 
        type: DataTypes.STRING, 
        allowNull: false, 
    }
}, { 
    timestamps: false, 
});



module.exports = Tarefa; 