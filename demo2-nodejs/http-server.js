
const http = require('http');
const url = require('url');
const querystring = require('querystring');

//controller选取
var handler = {
    controllers : [],
    getController : function(path){
        for(let i = 0; i < this.controllers.length; i ++){
            let h = this.controllers[i];
            if(h.path == path)
                return h;
        }
        return null;
    }
};

//用户controller
var userController = {
    path : "/user/info",
    method : "GET",
    do : function(body){
        return {'userId': body.id };
    }
}
handler.controllers.push(userController);

//消息controller
var msgController = {
    path : "/user/msg",
    method : "GET",
    do : function(body){
        let num = Math.random();
        if(num > 0.5)
            return {'msg': 'hello world'};
        else
            return {'msg': null}
    }
}
handler.controllers.push(msgController);


http.createServer(function (request, response) {
    var body = [];

    var parsedUrl = url.parse(request.url);
    var method = request.method;
    
    console.log(request.method);
    console.log(request.headers);

    request.on('data', function (chunk) {
        body.push(chunk);
    });

    request.on('end', function () {

        body = Buffer.concat(body);
        var bd;
        if(method == "GET")
            bd = querystring.parse(parsedUrl.query);
        else if(method == "POST")
            bd = JSON.parse(body.toString());
        else
            bd = {}

        let controller = handler.getController(parsedUrl.pathname);
        if(controller){
            try{
                response.writeHead(200, { 'Content-Type': 'application/json' });
                response.write(JSON.stringify(controller.do(bd)));
                response.end();
            }catch(err){
                response.writeHead(500, { 'Content-Type': 'text/html' });
                response.write('<!DOCTYPE html><html><head><meta charset="UTF-8"><title>500!</title></head><body><h1>500!</h1></body></html>');
                response.end();
            }
        }else{
            //404逻辑
            response.writeHead(404, { 'Content-Type': 'text/html' });
            response.write('<!DOCTYPE html><html><head><meta charset="UTF-8"><title>404!</title></head><body><h1>404!</h1></body></html>');
            response.end();
        }
        
    });
}).listen(80);