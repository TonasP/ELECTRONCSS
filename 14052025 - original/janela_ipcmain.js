const {ipcMain, BrowserWindow} = require('electron')
const path = require('path')


function abrirAlunos() {
    criarJanela('aluno.html')
}
function abrirProfessor() {
    criarJanela('prof.html')
}
module.exports = {
    abrirAlunos,
    abrirProfessor
}