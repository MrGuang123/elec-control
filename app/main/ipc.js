const { ipcMain, BrowserWindow } = require('electron')
const path = require('path')

let win
module.exports = function(win) {
    ipcMain.handle('login', async () => {
        let code = Math.floor(Math.random() * 899999) + 100000
        return code
    })

    ipcMain.on('control', async (e, remoteCode) => {
        console.log(remoteCode)
        // sendMainWindow('control-state-change', remoteCode, 1)
        win.webContents.send('control-state-change', remoteCode, 1)
        win = new BrowserWindow({
            width: 1000,
            height: 660,
            webPreferences: {
                nodeIntegration: true
            }
        })
        win.loadURL(path.resolve(__dirname, '../renderer/pages/controls/index.html'))
    })

}