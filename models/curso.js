const { DataTypes } = require('sequelize');
const sequelize = require("../config/sequelize");


const Curso = sequelize.define('Curso', { 
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

    

module.exports = Curso; 
