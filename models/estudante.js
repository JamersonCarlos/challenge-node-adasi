const { DataTypes } = require('sequelize');
const sequelize = require("../config/sequelize");

const Curso = require('./curso');

const Estudante = sequelize.define('estudante', { 
    cpf: { 
        type: DataTypes.STRING, 
        allowNull: false, 
        unique: true,
        primaryKey: true, 
    }, 
    nome: { 
        type: DataTypes.STRING, 
        allowNull: false, 
    },
    matricula: { 
        type: DataTypes.STRING, 
        allowNull: false, 
        unique: true, 
    },
    cursoId: { 
        type: DataTypes.INTEGER, 
        references: { 
            model: 'Cursos',
            key: 'id',
        }, 
        allowNull: false, 
    }
}, { 
    timestamps: false, 
});

Estudante.belongsTo(Curso, { foreignKey: 'cursoId' });
Curso.hasMany(Estudante, { foreignKey: 'cursoId' });


module.exports = Estudante; 

