'use strict';

import {app, ipcMain, protocol, session, net, BrowserWindow} from 'electron';
import {createProtocol, installVueDevtools} from 'vue-cli-plugin-electron-builder/lib';
import {autoUpdater} from 'electron-updater';

const storage = require('electron-localstorage');

const isDevelopment = process.env.NODE_ENV !== 'production';

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([{ scheme: 'app', privileges: { secure: true, standard: true } }]);

function createWindow() {
  // Create the browser window.
  /* const windowSize = storage.getItem('windowSize');
  const width = windowSize[0] ? windowSize[0] : 800;
  const height = windowSize[1] ? windowSize[1] : 600; */

  win = new BrowserWindow({
    width: 800, height: 600, webPreferences: {
      nodeIntegration: true
    }
  });

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    win.loadURL('app://./index.html')
  }

  win.on('closed', () => {
    win = null
  });
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }

  // storage.setItem('windowSize', win.getSize());
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {

  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    // Devtools extensions are broken in Electron 6.0.0 and greater
    // See https://github.com/nklayman/vue-cli-plugin-electron-builder/issues/378 for more info
    // Electron will not launch with Devtools extensions installed on Windows 10 with dark mode
    // If you are not using Windows 10 dark mode, you may uncomment these lines
    // In addition, if the linked issue is closed, you can upgrade electron and uncomment these lines
    // try {
    //   await installVueDevtools()
    // } catch (e) {
    //   console.error('Vue Devtools failed to install:', e.toString())
    // }

  }
  createWindow();

  // setInterval(() => getMemoryInfo(), 1000);

  // getNetInfo();

  /* const cookie = { url: 'https://www.cgtn.com', name: 'name', value: 'value' }
  session.defaultSession.cookies.set(cookie)
    .then(() => {}, error => console.error(error));

  session.defaultSession.cookies.get({})
    .then(cookies => console.log(cookies))
    .catch(error => console.log(error));

  session.defaultSession.cookies.get({ url: 'https://www.cgtn.com' })
    .then(cookies => console.log(cookies))
    .catch(error => console.log(error)); */

  /* ipcMain.on('saveUserInfo', (e, data) => storage.setItem('userInfo', data));

  ipcMain.on('mounted', e => e.sender.send('getUserInfo', storage.getItem('userInfo'))); */

  /* autoUpdater.setFeedURL({
    provider: "generic",
    url: "https://newstest.cgtn.com/event/echarts-demo/dist_electron/"
  });

  ipcMain.on('checkForUpdate', () => {
    //执行自动更新检查
    autoUpdater.checkForUpdates();
  }) */
});

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', data => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}

// setInterval(() => console.log(process.getCPUUsage()), 10000);

/* const getMemoryInfo = () => {
  const memoryInfoPromise = process.getProcessMemoryInfo()
  memoryInfoPromise.then(memoryInfo => console.log(memoryInfo));
}

const getNetInfo = () => {
  const request = net.request('https://www.cgtn.com');
  request.on('response', (response) => {
    console.log(`STATUS: ${response.statusCode}`);
    console.log(`HEADERS: ${JSON.stringify(response.headers)}`);
    response.on('data', chunk => console.log(`BODY: ${chunk}`));
    response.on('end', () => console.log('No more data in response.'));
  })
  request.end();
} */
