const { contextBridge, ipcRenderer } = require('electron')

function buscarAgendamentos() {
    return ipcRenderer.invoke('buscar-Agendamentos');
}
function excluirAgendamentos(agendamentoID) {
    return ipcRenderer.invoke('deletar-Agendamentos', agendamentoID);
}
function alterarAgendamento(id_cliente, id_funcionario, data_marcada, tipo) {
    return ipcRenderer.invoke('alterar-Agendamento', id_cliente, id_funcionario, data_marcada, tipo);
}
function salvarAgendamento(id_cliente, id_funcionario, data_marcada, tipo) {
    return ipcRenderer.invoke('salvar-Agendamento', id_cliente, id_funcionario, data_marcada, tipo)
}
contextBridge.exposeInMainWorld('GymAPI',{
    buscarAgendamentos:buscarAgendamentos,
    excluirAgendamentos:excluirAgendamentos,
    alterarAgendamento:alterarAgendamento,
    salvarAgendamento:salvarAgendamento,

})