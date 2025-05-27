const { BrowserWindow } = require('electron')
const path = require('path');
const { getJanelaPrincipal } = require('./janelaPrincipal');

function criarJanelaModal(telaPai,arquivohtml) {
    const janela = new BrowserWindow({
        width: 800,
        height: 600,

        modal:true,
        parent: telaPai,

        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    });

    janela.loadFile(arquivohtml);

    return janela;
};
function modalAbrirProfessor(){
    let mainWindow= getJanelaPrincipal();
    if (mainWindow){
        criarJanelaModal(mainWindow, './src/professor/prof.html')
    }
    else{
        console.warn("Não foi possivel abrir a modal : Janela Principal")
    }
}
function modalAbrirAluno(){
    let mainWindow= getJanelaPrincipal();
    if (mainWindow){
        criarJanelaModal(mainWindow, './src/aluno/aluno.html')
    }
    else{
        console.warn("Não foi possivel abrir a modal : Janela Principal")
    }
}

module.exports={
    criarJanelaModal,
    modalAbrirProfessor,
    modalAbrirAluno
    
}