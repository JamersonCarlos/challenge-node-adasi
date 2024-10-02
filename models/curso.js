const { DataTypes } = require('sequelize');
const sequelize = require("../config/sequelize");


const Curso = sequelize.define('curso', { 
    id: { 
        type: DataTypes.INTEGER, 
        autoIncrement: true, 
        primaryKey: true,
        allowNull: false, 
    }, 
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, { 
    timestamps: false, 
});

    

module.exports = Curso; 
