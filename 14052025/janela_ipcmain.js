const {ipcMain, BrowserWindow} = require('electron')
const path = require('path')

function criarJanela(arquivohtml){
    const janela = new BrowserWindow({
            width: 800,
            height: 600,
        });
    
        janela.loadFile(arquivohtml);
    }

function abrirAlunos(){
    criarJanela('aluno.html')
}
function abrirProfessor(){
    criarJanela('prof.html')
}
function abrirMenu(){
    criarJanela('index.html')
}
function registrarJanelas(){
    ipcMain.on('abrir-aluno', abrirAlunos)
    ipcMain.on('abrir-professor', abrirProfessor)
    ipcMain.on('abrir-menu', abrirMenu)
}
module.exports = {
    registrarJanelas
}