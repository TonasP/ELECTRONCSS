const { app, BrowserWindow } = require('electron');
const path = require('path');
const { registrarAlunoHandler } = require('./alunoHandler');
const {registrarProfHandler} = require ('./profhandler');
const {registrarJanelas} = require('./janela_ipcMain');
if (process.env.NODE_ENV !== 'production') {
  try {
    require('electron-reload')(__dirname, {
      electron: require(`${__dirname}/node_modules/electron`)
    });
  } catch (err) {
    console.error('electron-reload não foi carregado:', err);
  }
}

function createMainWindow() {
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    });

    mainWindow.loadFile('index.html');
}

app.whenReady().then(function () {

    createMainWindow();
    registrarProfHandler();
    registrarAlunoHandler()
    registrarJanelas()

    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) {
            createMainWindow();
        }
    });

}
);


app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});
