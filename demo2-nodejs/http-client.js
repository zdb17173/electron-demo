

const http = require('http');//http
const https = require('https');//https
const querystring = require('querystring');//js对象转querystring
const url = require('url');//处理url

//GET 请求demo
var relateNewsUrl = url.parse('http://localhost/user/msg')
relateNewsUrl.headers = {
    'Content-Type' : 'application/json',
    'accept' : 'application/json'
}

const getRequest = http.request(relateNewsUrl, (res) => {
    console.log(`STATUS: ${res.statusCode}`);
    console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
    res.setEncoding('utf8');
    let rawData = '';
    res.on('data', (chunk) => {
        rawData += chunk;
    });

    res.on('end', () => {
        try {
            const parsedData = JSON.parse(rawData);
            console.log(parsedData);
        } catch (e) {
            console.error(e.message);
        }
    });
  });
getRequest.end();



//POST请求 demo
//转成 content=string&path=string   'Content-Type': 'application/x-www-form-urlencoded'
//const postData = querystring.stringify({  "content": "string",  "path": "string"  });

//转成json "{"content":"string","path":"string"}"   'Content-Type': 'application/json'
const postData = JSON.stringify({  "id": "dsadsa",  "path": "string"  });


var postUrl = url.parse('http://localhost/user/info')
postUrl.method = 'POST';
postUrl.headers = {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(postData)
  }

const req = http.request(postUrl, (res) => {
    console.log(`STATUS: ${res.statusCode}`);
    console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
    res.setEncoding('utf8');
    let rawData = '';
    res.on('data', (chunk) => {
        rawData += chunk;
    });

    res.on('end', () => {
        try {
            const parsedData = JSON.parse(rawData);
            console.log(parsedData);
        } catch (e) {
            console.error(e.message);
        }
    });
});
req.write(postData);
req.end();


