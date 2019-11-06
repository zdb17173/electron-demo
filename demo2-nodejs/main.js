


//同工程下找到包
var counter = require('./counter');
//不同工程下找到包(需要在根目录写好package.js文件 注明main)
var otherCounter = require("C:\\dev\\workspace\\workspace-gitfran\\electron-demo\\demo3-nodejs");

var ccc = require('./test/counter');
console.log(ccc.ccc(1));

console.log(counter.c(1));
console.log(counter.c(1));
console.log(counter.c(1));


console.log(otherCounter.c(1));
console.log(otherCounter.c(1));
console.log(otherCounter.c(1));


var fs = require('fs'); //http://nodejs.org/api/fs.html
var path = require('path'); //http://nodejs.org/api/path.html

//同步遍历文件
function travel(dir, callback) {
    fs.readdirSync(dir).forEach(function (file) {
        var pathname = path.join(dir, file);

        if (fs.statSync(pathname).isDirectory()) {
            travel(pathname, callback);
        } else {
            callback(pathname);
        }
    });
}

travel('C:\\dev\\workspace\\workspace-gitfran\\electron-demo\\demo2-nodejs', function (pathname) {
    console.log(pathname);
});