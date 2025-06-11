const { ipcMain } = require('electron')
const {
    buscarAgendamentos,
    deletarAgendamento,
    alterarAgendamento,
    salvarAgendamento,
} = require('./agendamento/agendamentoDB');

function registrarAgendamentoHandler() {
    ipcMain.handle('buscar-Agendamentos', buscarAgendamentos);
    ipcMain.handle('deletar-Agendamentos', deletarAgendamento);
    ipcMain.handle('alterar-Agendamento', alterarAgendamento)
    ipcMain.handle('salvar-Agendamento', salvarAgendamento)
}
function registrarListeners() {
    registrarAgendamentoHandler
}
module.exports = {
    registrarListeners
}