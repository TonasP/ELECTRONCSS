// Assumindo que este código está no seu arquivo principal (ex: main.js ou index.js)
// onde o app Electron é iniciado.

const { BrowserWindow, ipcMain } = require('electron'); // ALTERADO: Adicionado ipcMain
const path = require('path');

let janelaPrincipal;

function createMainWindow() {
  janelaPrincipal = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      // O preload já está configurado corretamente, ótimo!
      preload: path.join(__dirname, 'preload.js')
    }
  });

  // O loadFile já está correto, ótimo!
  janelaPrincipal.loadFile(path.join(__dirname,  'index.html'));

  janelaPrincipal.on('closed', () => {
    janelaPrincipal = null;
  });

  return janelaPrincipal;
}

// NOVO: Adicione estes "ouvintes" para responder aos cliques dos botões
ipcMain.on('abrir-janela-agendamentos', () => {
  console.log('Recebido pedido para abrir a janela de Agendamentos.');
  // Aqui você chamaria a função que cria a janela de agendamentos.
  // Ex: createAgendamentosWindow();
});

ipcMain.on('abrir-janela-clientes', () => {
  console.log('Recebido pedido para abrir a janela de Clientes.');
  // Aqui você chamaria a função que cria a janela de clientes.
  // Ex: createClientesWindow();
});


function getJanelaPrincipal() {
  return janelaPrincipal;
}

module.exports = {
  getJanelaPrincipal,
  createMainWindow,
};