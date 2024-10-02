const express = require('express');
const router = express.Router();
const Atividade = require('../models/atividade');
const { 
    converter_horas_para_minutos, 
    compara_datas, 
    diferenca_minutos 
} = require('./functionsHelp');

router.post('', async (req, res) => { 
    const { data, hora_agendamento_inicio, hora_agendamento_termino, tarefaId, estudanteId } = req.body; 
    try {

        const [duracaoHoras, hora_inicio, hora_termino, minuto_inicio, minuto_termino ] = converter_horas_para_minutos(hora_agendamento_inicio, hora_agendamento_termino)
        //Condições de criação da Atividade
        if (duracaoHoras > 6){ 
            return res.status(409).json({message: "A duração da atividade não pode ultrapassar 6 horas."});
        } else if (duracaoHoras == 0 ){ 
            return res.status(409).json({message: "A duração da atividade não pode ser nula!"});
        } else if (hora_termino < hora_inicio || minuto_termino < minuto_inicio) { 
            return res.status(400).json({message: "hora de término no agendamento não podem ser anteriores à hora de início do agendamento."});
        } else if (compara_datas(data)) { 
            return res.status(400).json({message: "data do agendamento não podem ser anterior a data atual."});
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
        const [duracaoHoras, minuto_inicio, minuto_termino ] = converter_horas_para_minutos(hora_agendamento_inicio, hora_agendamento_termino);

        //Condições de criação da Atividade
        if (duracaoHoras > 6){ 
            res.status(409).json({message: "A duração da atividade não pode ultrapassar 6 horas."});
        } else if (duracaoHoras == 0 ){ 
            res.status(409).json({message: "A duração da atividade não pode ser nula!"});
        } else if (compara_datas(data)) { 
            res.status(400).json({message: "Data de agendamento Invalida!"});
        } else if (hora_termino < hora_inicio || minuto_termino < minuto_inicio) { 
            res.status(400).json({message: "Data e hora de término no agendamento não podem ser anteriores à data e hora de início do agendamento."});
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

router.delete('/:id', async (req, res) => { 
    const {id} = req.params;
    try { 
        await Atividade.destroy({where: { id: id}})
        res.status(200).json({message: "Atividade deletada com sucesso!"});
    } catch(error) {    
        res.status(500).json({message: "Atividade não encontrada!"});
    }
});

//Iniciar Atividade
router.post('/iniciar/:id', async (req, res) => { 
    const {id} = req.params; 
    const atividade = await Atividade.findAll({where: {id: id}});
    const diferenca = diferenca_minutos(atividade, true);
    const dataAgendamentoObj = atividade[0].dataValues.data; 
    const dataAtual = new Date();
    //Verificando condições
    if (dataAgendamentoObj.toISOString().split("T")[0] == dataAtual.toISOString().split("T")[0]) { 
        if (diferenca <= 15) { 
            try {
                await Atividade.update({ hora_inicio: `${dataAtual.getHours}:${dataAtual.getMinutes}`}, {where: {id: id}}); 
                res.status(200).json({message: `Atividade iniciada com sucesso: ${dataAtual}`});
            } catch (error) {
                res.status(500).json({message: "Erro ao iniciar atividade!"});
            }
        } else { 
            if (diferenca_minutos(atividade, false) < 0) { 
                res.status(409).json({message: `A atividade não pode ser iniciada mais de 15 minutos antes`});
            } else { 
                res.status(409).json({message: `A atividade não pode ser iniciada mais de 15 minutos depois`});
            }
        }
    } else { 
        res.status(400).json({message: "Não é possivel iniciar atividade em outra data"})
    }
});

//Finalizar atividade
router.post('/finalizar/:id', async(req, res) => { 
    const { id } = req.params; 
    const atividade = await Atividade.findAll({where: {id: id}});
    const hora_inicio = atividade[0].dataValues.hora_inicio;
    const hora_atual = new Date();
    if(!hora_inicio) { 
        res.status(400).json({message: "Atividade ainda não foi iniciada!"}); 
    } else { 
        await Atividade.update({hora_termino: `${hora_atual.getHours}:${hora_atual.getMinutes}`}, {where: {id:id}});
        res.status(200).json({message: "Atividade finalizada com sucesso!"});
    }
});


module.exports = router; 