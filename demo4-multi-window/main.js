// Modules to control application life and create native browser window
const {app, BrowserWindow} = require('electron');
const {ipcMain} = require('electron');
const path = require('path');
const net = require('net');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, 'preload.js')
    }
  })

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })

  ipcMain.on('heartbeat', (event, arg) => {
    var id = event.sender.id;
    var len = msgStore.msg.length;
    var offset = msgStore.offset[id];
    if(!offset)
      offset = 0;

    if(len == offset)
      return;

    msgStore.offset[id] = len;

    for(var i = offset; i < len; i ++){
      event.reply('sendMsgToIpc', msgStore.msg[i]);
    }
    
  })

  var msgStore ={
    msg : [],
    offset : []
  };
  var client = net.connect(
    {
        port: 1234,
        host: "localhost"
    },
    function(){
        client.on("data", function(data) {
            var d = data.toString();
            msgStore.msg.push(d);
            client.write("recived");
        });
    }
);

}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) createWindow()
})





// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
