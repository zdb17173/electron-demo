<template>
  <div class="home">
    <!-- <div>
      <a href="http://www.cgtn.com">第一种跳转方式</a>
      <br>
      <a href="http://www.cgtn.com" target="_blank">第二种跳转方式</a>
      <br>
      <a href="javascript:void(0);" @click="createWindow">第三种跳转方式</a>
    </div>
    <div>
      <p @click="handleMsgClick">点击信息复制</p>
      <button @click="handleBtnClick">粘贴</button>
      <br/>
      <input ref="inputText" type="text"/>
    </div>
    <div>
      <button @click="handleImgClick">复制图片</button>
      <br/>
      <img ref="image" src="" alt="">
    </div>
    <div>
      <label>用户名：</label>
      <input ref="username" type="text">
      <br>
      <label>密码：</label>
      <input ref="password" type="password">
      <br>
      <button @click="saveUserInfo">保存</button>
    </div>
    <div class="drop" @dragenter.prevent @dragover.prevent @drop="handleFileDrop">拖拽文件至此处</div>
    <div>
      <p>文件名： {{filename}}</p>
      <p>文件大小： {{fileSize}}</p>
      <p>文件内容：{{fileContent}}</p>
    </div> -->

    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
  const fs = require('fs');
  const { ipcRenderer, remote } = require('electron');
  const { BrowserWindow, clipboard, nativeImage } = remote;
  // let win;

  // @ is an alias to /src
  import HelloWorld from '@/components/HelloWorld.vue'

  export default {
    name: 'home',
    components: {
      HelloWorld
    },
    data: () => ({
      filename: '',
      fileSize: '',
      fileContent: ''
    }),
    mounted() {
      /* this.handleMounted();
      ipcRenderer.once('getUserInfo', (e, data) => {
        const { username, password } = data;
        this.$refs.username.value = username;
        this.$refs.password.value = password;
      });
      ipcRenderer.send('checkForUpdate'); */
    },
    methods: {
      createWindow: () => {
        win = new BrowserWindow({
          width: 800,
          height: 600
        });
        win.loadURL('https://www.cgtn.com');
        win.on('close', () => win = null);
      },
      handleMsgClick: e => {
        clipboard.writeText(e.target.innerHTML);
      },
      handleBtnClick() {
        this.$refs.inputText.value = clipboard.readText();
      },
      handleImgClick() {
        const image = nativeImage.createFromPath('./md_src/1571621650957.jpg');
        clipboard.writeImage(image);
        const imgSrc = clipboard.readImage().toDataURL();
        this.$refs.image.src = imgSrc;
      },
      saveUserInfo() {
        const username = this.$refs.username.value;
        const password = this.$refs.password.value;
        ipcRenderer.send('saveUserInfo', { username, password });
      },
      handleMounted: () => ipcRenderer.send('mounted'),
      handleFileDrop(e) {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        this.filename = file.name;
        this.fileSize = file.size;
        fs.readFile(file.path, 'utf8', (err, data) => {
          this.fileContent = data;
        });
      }
    }
  }
</script>

<style scoped>
  .drop {
    width: 100px;
    height: 100px;
    background: red;
  }
</style>
