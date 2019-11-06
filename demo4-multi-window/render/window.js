
const {ipcRenderer} = require('electron');

ipcRenderer.on('sendMsgToIpc', (e, data) => {
    const element = document.getElementById('content');
    element.innerHTML = element.innerHTML + "<div>" + data + "</div>";
});

setInterval(() => {
    ipcRenderer.send('heartbeat', 'ping');
}, 3000);



