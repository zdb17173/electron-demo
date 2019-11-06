var util=require('util');
var events=require('events');

//JS自身提供的异常捕获和处理机制——try..catch..，只能用于同步执行的代码。
//在NodeJS中，几乎所有异步API都按照以上方式设计，回调函数中第一个参数都是err。因此我们在编写自己的异步函数时，也可以按照这种方式来处理异常，与NodeJS的设计风格保持一致。
// function async(fn, callback) {
//     // Code execution path breaks here.
//     setTimeout(function ()　{
//         try {
//             callback(null, fn());
//         } catch (err) {
//             callback(err);
//         }
//     }, 0);
// }

// var fn = function() { console.log("dsada");};

// async(null, function (err, data) {
//     if (err) {
//         console.log('Error: %s', err.message);
//     } else {
//         // Do something.
//     }
// });

var arr = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];

(function next(i, len, callback) {
    if (i < len) {
        async(arr[i], function (value) {
            arr[i] = value;
            next(i + 1, len, callback);
        });
    } else {
        callback();
    }
}(0, arr.length, function () {
    console.log("All array items have processed.");
}));

function async(item, callback){
    //并行执行
    setImmediate(function(){
        console.log(item);
    });

    //顺序执行
    // console.log(item);
    callback();
}


// console.log(1)
// const p = new Promise((resolve, reject) => {
//     console.log(2)
//     setTimeout(() => console.log(3), 0)
//     resolve(4)
// })
// p.then(v => console.log(v))
// console.log(5)



