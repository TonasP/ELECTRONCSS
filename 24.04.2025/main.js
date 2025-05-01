const { app, BrowserWindow } = require('electron');
const path= require('path')
const { configurarHandleSelectFile } = require('./handleUpload');
require('electron-reload')(__dirname, {
  electron: require(`${__dirname}/node_modules/electron`)
});

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    autoHideMenuBar: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true
    }
  })

  win.loadFile('janelas/index.html')
}

app.whenReady().then( ()=> {// () => é a mesma coisa que function()
  createWindow();
  configurarHandleSelectFile();
}
);

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();

  }
})

