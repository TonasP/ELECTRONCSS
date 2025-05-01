const fs = require('fs');
const { ipcMain, dialog } = require('electron')

async function abrirSeletorArquivo() {

    const resultado = await dialog.showOpenDialog(
        {
            properties: ['openFile'],
            filters: [ 
                {name: 'jsons', extensions : ['json']}

            ]
        }
    );

    if (resultado.canceled || resultado.filePaths.length === 0) {
        return null
    }
   
    let caminhos = resultado.filePaths;
    let caminho = caminhos[0]
    const ler = fs.readFileSync(caminho, 'utf8');
    const converter = JSON.parse(ler)
    console.log (converter)
    return converter;    
}

function configurarHandleSelectFile(){
    ipcMain.handle('select-file', abrirSeletorArquivo) ;

};

module.exports={
    configurarHandleSelectFile
}