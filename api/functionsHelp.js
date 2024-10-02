function converter_horas_para_minutos(hora_agendamento_inicio, hora_agendamento_termino) { 
    const [hora_inicio, minuto_inicio] = hora_agendamento_inicio.split(':').map(Number);    
    const [hora_termino, minuto_termino] = hora_agendamento_termino.split(':').map(Number);
    
    //Conversão para minutos
    const totalMinutosInicio = hora_inicio * 60 + minuto_inicio; 
    const totalMinutosTermino = hora_termino * 60 + minuto_termino; 

    //Duração em horas 
    const duracaoMinutos = Math.abs(totalMinutosInicio - totalMinutosTermino); 
    const duracaoHoras = duracaoMinutos / 60; 

    return [duracaoHoras, hora_inicio, hora_termino, minuto_inicio, minuto_termino]; 
}
function compara_datas(data) { 
    const dataAgendamentoObj = new Date(data); 
    const dataAtual = new Date();
    return (dataAgendamentoObj.getTime >= dataAtual.getTime); 
}

function diferenca_minutos(atividade, abs){ 
    dataAgendamentoString = atividade[0].dataValues.data.toISOString();
    hora_agendamento_inicio = atividade[0].dataValues.hora_agendamento_inicio; 

    //Conversão das datas 
    const dataAgendamentoObj = new Date(dataAgendamentoString.replace(' ', 'T')); 
    const dataAtual = new Date();

    const total_minutos_inicio_atividade = dataAtual.getHours() * 60 + dataAtual.getMinutes(); 
    const [horas_horario_agendado_inicio ,minutos_horario_agendado_inicio] = hora_agendamento_inicio.split(':').map(Number);

    const total_minutos_agendamento_inicio = horas_horario_agendado_inicio * 60 + minutos_horario_agendado_inicio; 
    if(abs){ 
        return Math.abs(total_minutos_inicio_atividade - total_minutos_agendamento_inicio);
    }
    return (total_minutos_inicio_atividade - total_minutos_agendamento_inicio); 
}

module.exports = {
    converter_horas_para_minutos,
    compara_datas,
    diferenca_minutos
};