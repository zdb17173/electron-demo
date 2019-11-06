

const net = require('net');


//http协议客户端实现
// var client = net.connect({
//     port: 9393,
//     host: "localhost"

// }, function() { //'connect' listener
//     console.log('connected to server!!!');
//     client.write(
//         'POST /api/test HTTP/1.1\r\n'+
//         'Host: localhost:9393\r\n'+
//         'Content-Length: 45\r\n'+
//         'Accept: application/json\r\n'+
//         'Content-Type: application/json\r\n'+
//         '\r\n\r\n'+
//         '{"content": "string","path": "string"}'+
//         '\r\n\r\n'
//     );
//     client.end();
//     client.on("data", function(data) {
//         var d = data.toString();

//         console.log(d);
//     });
// });



var client = net.connect(
    {
        port: 1234,
        host: "localhost"
    },
    function(){
        client.on("data", function(data) {
            var d = data.toString();
            console.log(d);

            client.write("recived");
        });
    }
);




