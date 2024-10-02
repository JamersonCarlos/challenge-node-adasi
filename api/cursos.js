const express = require('express');
const router = express.Router();
const Curso = require('../models/curso');

// Rota para criar um curso 
router.post('', async (req, res) => { 
    const { nome } = req.body; 
    Curso.findAll({where: { nome }}).then(async cursos => { 
        if(cursos.length == 0) { 
            try {
                const novoCurso = await Curso.create({ nome });
                return res.status(201).json(novoCurso);
            } catch (error) {
                return res.status(500).json({ message: 'Erro ao inserir curso', error });
            }
        } else { 
            return res.status(409).json({ message: "Esse curso já existe!"});
        }
    }).catch(error => res.status(500).json({message: "Erro ao buscar cursos"}, error));
});


module.exports = router; 

