const path = require('path')
const { app, BrowserWindow } = require('electron')
const isDev = false // require('electron-is-dev')

console.log(`electron main startup, isDev=${isDev}`)

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  win.loadFile(path.join(__dirname, './index.html'))

  // const url = isDev
  //   ? 'http://localhost:3000'
  //   : `file://${path.join(__dirname, './index.html')}`;
  // console.log(`electron main - loading ${url}`)
  //
  // win.loadURL(
  //   url
  // );
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

