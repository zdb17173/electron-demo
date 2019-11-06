

// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
window.addEventListener('DOMContentLoaded', () => {

    const {BrowserWindow} = require('electron').remote
    const path = require('path')

    const newWindowBtn = document.getElementById('open-window')

    newWindowBtn.addEventListener('click', (event) => {
        const modalPath = path.join('file://', __dirname, '/page/window.html')
        let win = new BrowserWindow({ 
            width: 400, 
            height: 320 , 
            webPreferences: {
                nodeIntegration: true
            }
        })

        win.on('close', () => { win = null });
        win.loadURL(modalPath)
        win.show()
    });

    
    
})


