const net = require('net');
var events = require("events");

var  emitter = new events.EventEmitter();


var clientList = [];
var msg = [];

var server = net.createServer(function(socket) { 
    
    clientList.push(socket);

    socket.on("data", function(data) {
        console.log(data.toString());
    });

    socket.on("close", function() {
        //当前客户机下线时，将其从客户机数组中移除
        clientList.splice(clientList.indexOf(socket), 1);
    });

    socket.on('error', function(err) {
      console.log(socket.name + '退出');
    });
}) ;
server.listen(1234) ;


emitter.addListener("sendMsgToClient",function(){
  console.log("sendMsgToClient");

  if(clientList.length > 0){
    clientList.forEach((socket, index, array)=>{
        var d = new Date()
        socket.write("message["+d.getHours()+":"+ d.getMinutes() +":"+ d.getSeconds() +"]");
    });
  }
    
  console.log("client["+ clientList.length +"]");

  setTimeout(function(){
    emitter.emit("sendMsgToClient");
  }, 3000);
});
emitter.emit("sendMsgToClient");


// emitter.addListener("sendMsgToClient",function(){
//   console.log("sendMsgToClient");
//   setTimeout(function(){
//     emitter.emit("sendMsgToClient");
//   }, 1000);
// });
// emitter.emit("sendMsgToClient");


