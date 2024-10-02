const express = require('express');
const router = express.Router();

router.post('', async (req, res) => { 
    const { nome } = req.body; 
    Tarefa.findAll({where: { nome }}).then(async tarefas => { 
        if(tarefas.length == 0) { 
            try {
                const novaTarefa = await Tarefa.create({ nome });
                return res.status(201).json(novaTarefa);
            } catch (error) {
                return res.status(500).json({ message: 'Erro ao inserir tarefa', error });
            }
        } else { 
            return res.status(409).json({ message: "Essa tarefa já existe!"});
        }
    }).catch(error => res.status(500).json({message: "Erro ao buscar tarefas"}, error));
});

router.get('', async (req ,res) => { 
    try { 
        const tarefas = await Tarefa.findAll();
        res.status(200).json({message: "Lista de Tarefas", tarefas});
    } catch(error) { 
        res.status(500).json({message: "Erro ao buscar tarefas", error});
    }
});

module.exports = router; 

