const { ipcMain } = require('electron')
const {
    buscarprof,
    deletarprof,
    alterarprof,
    salvarprof,
} = require('./professor/profDB')
const {
    buscarAlunos,
    deletarAluno,
    alterarAluno,
    salvarAluno,
} = require('./aluno/alunoDB');
const { modalAbrirProfessor } = require('./janelaModal');
const {modalAbrirAluno} =require ('./janelaModal')


function registrarAlunoHandler() {
    ipcMain.handle('buscar-alunos', buscarAlunos);
    ipcMain.handle('deletar-alunos', deletarAluno);
    ipcMain.handle('alterar-aluno', alterarAluno)
    ipcMain.handle('salvar-aluno', salvarAluno)
}

function registrarProfHandler() {
    ipcMain.handle('buscar-prof', buscarprof);
    ipcMain.handle('deletar-prof', deletarprof);
    ipcMain.handle('alterar-prof', alterarprof)
    ipcMain.handle('salvar-prof', salvarprof)
}
function registrarJanelas() {
    ipcMain.on('abrir-aluno', modalAbrirAluno)
    ipcMain.on('abrir-professor', modalAbrirProfessor)
}
function registrarListeners() {
    registrarAlunoHandler(),
        registrarProfHandler(),
        registrarJanelas()
}
module.exports = {
    registrarListeners
}