const { app, BrowserWindow } = require('electron');
const { createMainWindow } = require('./src/janelaPrincipal');
const { registrarListeners } = require('./src/applisteners');
require('electron-reload')(__dirname, {
  electron: require(`${__dirname}/node_modules/electron`)
});

app.whenReady().then(() => {
  createMainWindow();
  registrarListeners();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createMainWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});