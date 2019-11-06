
# 基本使用
```
# npm安装包
npm install

# 运行nodejs
node .\net-server.js

# 调试
#在.vscode中修改launch.json 之后debug

# electron中支持打开chrome调试窗口，可进行前台调试
```

# demo1-build

最基础入门demo


# demo2-nodejs

### 基础语法
- require包引用  main.js
- 异步代码编写规范 异常抛出规范 async.js
- nodejs 模块化，使用exports。  相同项目模块counter.js &    不同项目模块 ../demo3-nodejs/counter.js


### net模块 socket server & client实现简单通讯
- net-client 链接1234端口，收到消息后打印
- net-server 提供1234端口服务，客户端注册后，每3秒向客户端发送消息。使用了net模块、event模块


### http模块 server & client
- http-server 服务端提供调get post两种方法 
- http-client 客户端调用

# demo3-nodejs

测试包引用的工程

# demo4-multi-window

多窗口，主进程 渲染进程交互

# demo5-file
文件操作

# electronjs-research-qj
整体调研

# offical-electron-api-demos
官方dmeo

