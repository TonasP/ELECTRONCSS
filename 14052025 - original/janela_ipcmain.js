const {ipcMain, BrowserWindow} = require('electron')
const path = require('path')

function criarJanela(arquivoHtml){
     const janela = new BrowserWindow({
            width: 800,
            height: 600,
            webPreferences: {
                  preload: path.join(__dirname, 'preload.js')
                }
        });

         janela.loadFile(arquivoHtml);
}

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