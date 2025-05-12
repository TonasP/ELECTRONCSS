const { app, BrowserWindow } = require('electron');
const path= require('path')


if (process.env.NODE_ENV !== 'production') {
  try {
    require('electron-reload')(__dirname, {
      electron: require(`${__dirname}/node_modules/electron`)
    });
  } catch (err) {
    console.error('electron-reload não foi carregado:', err);
  }
}

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    icon: path.join(__dirname, 'icone/rolo-de-filme.png'),
    autoHideMenuBar: true,
    webPreferences: {

      contextIsolation: true
    }
  })

  win.loadFile('janelas/index.html')
}

app.whenReady().then( ()=> {
  createWindow();
  configurarHandleSelectFile();
}
);

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();

  }
})

