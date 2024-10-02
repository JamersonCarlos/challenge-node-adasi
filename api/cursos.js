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

// Rota para listar os cursos cadastrados
router.get('', async (req, res) => { 
    try {
         const cursos = await Curso.findAll();
         res.status(200).json(cursos);
    } catch (error) {
         res.status(500).json({message: "Erro ao buscar usuários", error});
    } 
 });

// Rota para buscar um curso específico 
router.get('/:id', async (req, res) => { 
    const { id } = req.params; 
    try {
        const curso = await Curso.findAll({where: {id: id}})[0];
        res.status(200).json({curso});
    } catch (error) {   
        res.status(500).json({message: `Erro ao buscar curso id: ${id}`, error});       
    }

});
 
// Rota para atualizar um curso 
router.put('/:id', async (req, res) => { 
    const { id } = req.params; 
    const { nome } = req.body; 
    try { 
        await Curso.update({nome}, { 
            where: { id: id }
        });
        res.status(200).json({message: "Curso atualizado com sucesso"});
    } catch(error) { 
        res.status(404).json({message: "Usuário não encontrado"});
    }
});

// Rota para remover um curso
router.delete('/:id', async (req, res) => { 
    const { id } = req.params; 
    try { 
        await Curso.destroy({where: {id: id}});
        res.status(200).json({message: "Curso removido com sucesso"});       
    } catch(error) { 
        res.status(404).json({message: "Curso não encontrado!"});
    }
});
module.exports = router; 

