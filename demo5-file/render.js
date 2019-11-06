const fs = require('fs')


var dir = 'C:\\Users\\fran\\Documents\\WeChat Files\\zdb17173\\FileStorage\\File\\2019-10';

function readdir(dir){
    const list = fs.readdirSync(dir);

    return function loopFiles(list){
      var result = [];
      list.forEach(function(f) {
        var file = dir + '/' + f
      
        var stat = fs.statSync(file)
        if (stat && stat.isDirectory()){
          result.push({
            name: f,
            path: file,
            time: stat.birthtime,
            isDirectory: true
          });
        }else{
          result.push({
            name: f,
            path: file,
            time: stat.birthtime,
            isDirectory: false
          });
        }
      })
    
      return result;
    }(list);
}

exports.readdir = readdir;