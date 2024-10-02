const express = require('express');
const router = express.Router();

router.post('', async (req, res) => { 
    const { cpf, nome, curso, matricula } = req.body; 
    try {
        const novoEstudante = await Estudante.create({ cpf, nome, curso, matricula }); 
        res.status(201).json({message: "Estudante criado com sucesso!", novoEstudante});
    } catch (error) {
        if(error.name == "SequelizeUniqueConstraintError") { 
            res.status(409).json({message: "Já existe um usuário cadastrado com esse CPF ou Matricula", error});
        } else if (error.name == "SequelizeForeignKeyConstraintError") { 
            res.status(400).json({message: "Curso especificado não existe"});
        } else { 
            res.status(500).json({message: "Erro ao inserir estudante", error});
        }
    }
}); 

router.get('', async (req, res) => { 
    try { 
        const estudantes = await Estudante.findAll();
        res.status(200).json({message: "Lista de estudantes", estudantes}); 
    } catch(error) { 
        res.status(500).json({message: "Erro ao buscar estudantes", error});
    }
});


router.get('/:cpf', async (req, res) => { 
    const { cpf } = req.params; 
    try {
        const estudante = await Estudante.findAll({where: {cpf: cpf}})[0];
        res.status(200).json({estudante});
    } catch (error) {   
        res.status(500).json({message: `Erro ao buscar curso id: ${id}`, error});       
    }
});
module.exports = router; 

