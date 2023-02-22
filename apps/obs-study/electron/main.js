const path = require('path')
const { app, BrowserWindow } = require('electron')

const workingDir = path.join(__dirname,'../../../dist/apps/obs-study/exported')
app.setPath ('userData', workingDir);

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  // win.loadFile('index.html')

  // win.loadURL(`file://${path.join(__dirname,'./index.html')}`);
  win.loadURL(`file://${path.join(workingDir,'index.html')}`);
}


app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

