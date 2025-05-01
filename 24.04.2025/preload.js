const {contextBridge, ipcRenderer} = require('electron')

function selectFile(){
    return ipcRenderer.invoke('select-file');
}

contextBridge.exposeInMainWorld('api',{
    selectFile: selectFile
})