module.exports = {
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        "publish": [
          {
            "provider": "generic",
            "url": "https://newstest.cgtn.com/event/echarts-demo/dist_electron/",
          }
        ],
      }
    }
  }
}