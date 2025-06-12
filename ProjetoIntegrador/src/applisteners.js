const { ipcMain } = require('electron');

// Importe os módulos de banco de dados
const agendamentoDB = require('./agendamento/agendamentoDB');
const clienteDB = require('./cliente/clienteDB');
const funcionarioDB = require('./funcionario/funcionarioDB');
const pagamentosDB = require('./pagamentos/pagamentosDB');
const planoDB = require('./plano/planoDB');
const servicoDB = require('./servico/servicoDB');

// --- Handlers por Entidade ---

function registrarAgendamentoHandler() {
    ipcMain.handle('buscar-agendamentos', agendamentoDB.buscarAgendamentos);
    ipcMain.handle('deletar-agendamento', agendamentoDB.deletarAgendamento);
    ipcMain.handle('alterar-agendamento', agendamentoDB.alterarAgendamento);
    ipcMain.handle('salvar-agendamento', agendamentoDB.salvarAgendamento);
}

function registrarClienteHandler() {
    ipcMain.handle('buscar-clientes', clienteDB.buscarClientes);
    ipcMain.handle('deletar-cliente', clienteDB.deletarCliente);
    ipcMain.handle('alterar-cliente', clienteDB.alterarCliente);
    ipcMain.handle('salvar-cliente', clienteDB.salvarCliente);
}

function registrarFuncionarioHandler() {
    ipcMain.handle('buscar-funcionarios', funcionarioDB.buscarFuncionarios);
    ipcMain.handle('deletar-funcionario', funcionarioDB.deletarFuncionario);
    ipcMain.handle('alterar-funcionario', funcionarioDB.alterarFuncionario);
    ipcMain.handle('salvar-funcionario', funcionarioDB.salvarFuncionario);
}

function registrarPagamentoHandler() {
    ipcMain.handle('buscar-pagamentos', pagamentosDB.buscarPagamentos);
    ipcMain.handle('deletar-pagamento', pagamentosDB.deletarPagamento);
    ipcMain.handle('alterar-pagamento', pagamentosDB.alterarPagamento);
    ipcMain.handle('salvar-pagamento', pagamentosDB.salvarPagamento);
}

function registrarPlanoHandler() {
    ipcMain.handle('buscar-planos', planoDB.buscarPlanos);
    ipcMain.handle('deletar-plano', planoDB.deletarPlano);
    ipcMain.handle('alterar-plano', planoDB.alterarPlano);
    ipcMain.handle('salvar-plano', planoDB.salvarPlano);
}

function registrarServicoHandler() {
    ipcMain.handle('buscar-servicos', servicoDB.buscarServicos);
    ipcMain.handle('deletar-servico', servicoDB.deletarServico);
    ipcMain.handle('alterar-servico', servicoDB.alterarServico);
    ipcMain.handle('salvar-servico', servicoDB.salvarServico);
}

// --- Função Principal para Registrar Todos os Listeners ---

function registrarListeners() {
    registrarAgendamentoHandler();
    registrarClienteHandler();
    registrarFuncionarioHandler();
    registrarPagamentoHandler();
    registrarPlanoHandler();
    registrarServicoHandler();
}

module.exports = {
    registrarListeners
};