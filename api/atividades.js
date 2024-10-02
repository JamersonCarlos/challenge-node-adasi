const express = require('express');
const router = express.Router();

router.post('', async (req, res) => { 
    const { data, hora_agendamento_inicio, hora_agendamento_termino, tarefaId, estudanteId } = req.body; 
    try {

        const [duracaoHoras, minuto_inicio, minuto_termino ] = converterHoras(hora_agendamento_inicio, hora_agendamento_termino)

        //Condições de criação da Atividade
        if (duracaoHoras > 6){ 
            res.status(409).json({message: "A duração da atividade não pode ultrapassar 6 horas"});
        } else if (duracaoHoras == 0 ){ 
            res.status(409).json({message: "A duração da atividade não pode ser nula!"});
        } else if (compara_datas(data)) { 
            res.status(400).json({message: "Data de agendamento Invalida!"});
        } else if (hora_termino < hora_inicio || minuto_termino < minuto_inicio) { 
            res.status(400).json({message: "Horário de agendamento Invalido!"});
        } else {
            try { 
                const novaAtividade = await Atividade.create({ data, hora_agendamento_inicio, hora_agendamento_termino, tarefaId, estudanteId});
                res.status(201).json({message: "Atividade criada com sucesso", novaAtividade});
            } catch(error) { 
                res.status(500).json({message: "Erro ao salvar atividade!", error})
            }
        }
    } catch (error) {
        res.status(500).json({message: "Erro ao verificar condições!", error})
    }
});

router.get('', async (req, res) => { 
    try {
        const atividades = await Atividade.findAll();
        res.status(200).json({message: "Lista de atividades", atividades});
    } catch (error) {
        res.status(500).json({message: "Erro ao consultar listas"});
    }
});

router.put('/:id', async (req, res) => { 
    const { id } = req.params; 
    const { data, hora_agendamento_inicio, hora_agendamento_termino, tarefaId, estudanteId } = req.body; 
    try {
        const [duracaoHoras, minuto_inicio, minuto_termino ] = converterHoras(hora_agendamento_inicio, hora_agendamento_termino);

        //Condições de criação da Atividade
        if (duracaoHoras > 6){ 
            res.status(409).json({message: "A duração da atividade não pode ultrapassar 6 horas"});
        } else if (duracaoHoras == 0 ){ 
            res.status(409).json({message: "A duração da atividade não pode ser nula!"});
        } else if (compara_datas(data)) { 
            res.status(400).json({message: "Data de agendamento Invalida!"});
        } else if (hora_termino < hora_inicio || minuto_termino < minuto_inicio) { 
            res.status(400).json({message: "Horário de agendamento Invalido!"});
        } else {
            try { 
                const atividadeUpdate = await Atividade.update({ data, hora_agendamento_inicio, hora_agendamento_termino, tarefaId, estudanteId}, {where: {id: id}});         
                if(atividadeUpdate[0] == 1) { 
                    res.status(201).json({message: "Atividade atualizada com sucesso"});
                } else { 
                    res.status(400).json({message: "Atividade não encontrada!"});
                }
           
            } catch(error) { 
                res.status(500).json({message: "Erro ao salvar atividade!", error})
            }
        }
    } catch (error) {
        res.status(500).json({message: "Erro ao verificar condições!", error})
    }
}); 


module.exports = router; 