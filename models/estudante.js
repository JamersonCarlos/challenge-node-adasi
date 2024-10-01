const { DataTypes } = require('sequelize');
const sequelize = require("../config/sequelize");

const Curso = require('./curso');

const Estudante = sequelize.define('Estudante', { 
    cpf: { 
        type: DataTypes.STRING, 
        allowNull: false, 
        unique: true,
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
    curso: { 
        type: DataTypes.UUID, 
        references: { 
            model: 'Cursos',
            key: 'id',
        }
    }
});

Estudante.belongsTo(Curso, { foreignKey: 'cursoId' });
Curso.hasMany(Estudante, { foreignKey: 'cursoId' });


module.exports = Estudante; 

