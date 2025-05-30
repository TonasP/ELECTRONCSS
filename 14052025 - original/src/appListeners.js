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
const {
    buscarcurso,
    deletarcurso,
    alterarcurso,
    salvarcurso,
} = require('./curso/cursoDB')
const {
     buscarmateria,
    deletarmateria,
    alterarmateria,
    salvarmateria,
} = require ('./materia/materiaDB')
const { modalAbrirProfessor } = require('./janelaModal');
const { modalAbrirAluno } = require('./janelaModal')
const { modalAbrirCurso } = require('./janelaModal')
const {modalAbrirMateria }= require('./janelaModal')


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
function registrarCursoHandler() {
    ipcMain.handle('buscar-curso', buscarcurso)
    ipcMain.handle('deletar-curso', deletarcurso)
    ipcMain.handle('alterar-curso', alterarcurso)
    ipcMain.handle('salvar-curso', salvarcurso)
}
function registrarMateriaHandler(){
    ipcMain.handle('buscar-materia', buscarmateria)
    ipcMain.handle('deletar-materia', deletarmateria)
    ipcMain.handle('alterar-materia', alterarmateria)
    ipcMain.handle('salvar-materia', salvarmateria)
}
function registrarJanelas() {
    ipcMain.on('abrir-aluno', modalAbrirAluno)
    ipcMain.on('abrir-professor', modalAbrirProfessor)
    ipcMain.on('abrir-curso', modalAbrirCurso)
    ipcMain.on('abrir-materia', modalAbrirMateria)
}
function registrarListeners() {
    registrarCursoHandler(),
        registrarAlunoHandler(),
        registrarProfHandler(),
        registrarJanelas(),
        registrarMateriaHandler()
}
module.exports = {
    registrarListeners
}