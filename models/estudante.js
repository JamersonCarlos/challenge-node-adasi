const sequelize = require("../config/sequelize");
const { DataTypes } = require('sequelize');
const Curso = require('./curso');

const estudante = (sequelize, DataTypes) => { 
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
    Curso.hasMany(Aluno, { foreignKey: 'cursoId' });
    return Estudante; 
};

module.exports = estudante; 

