const { app, BrowserWindow } = require('electron');
const { isMac, isWindows } = require('./detect-platform');
const path = require('path');

const createWindow = () => {
  const win = new BrowserWindow({
    width: 248,
    height: 342,
    frame: false,
    titleBarStyle: 'hidden',
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
  }
  });

  win.loadFile('./dist/Angular-Calculator/index.html');
};

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

function listenForEmergency() {
  let message = 'Emergency: We have no beer'
  console.log('Wait 5 seconds before "receiving" emergency message'); // Testing
  setTimeout(() => { showEmergencyWindow(message); }, 5000);
}

// Create window and send message via IPC
function showEmergencyWindow(message) {
  window = createWindow();
  window.webContents.send('emergency', message); // <-- Use of IPC messaging
}