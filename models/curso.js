const { DataTypes } = require('sequelize');
const sequelize = require("../config/sequelize");

const curso = (sequelize, DataTypes) => { 
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

    
    return Curso; 
}

module.exports = curso; 
