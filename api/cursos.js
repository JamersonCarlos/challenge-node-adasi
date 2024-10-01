const express = require('express');
const router = express.Router();
const Curso = require('../models/curso');

router.post('', async (req, res) => { 
    const { nome } = req.body; 
    try {
        const novoCurso = await Curso.create({ nome });
        return res.status(201).json(novoCurso);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erro ao inserir curso', error });
    }
});

module.exports = router; 

