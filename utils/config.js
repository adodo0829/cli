// 默认配置文件

// fs-extra模拟了类似如Linux下的命令
const fse = require('fs-extra')
const { exit } = require('process')
const path = require('path')

const config = {
  name: 'my-cli',
  mirror: 'https://registry.npm.taobao.org/'
}

const confPath = path.resolve(__dirname, '../config.json')

async function defineConfig() {
  try {
    // 将 config 内容保存本机 json 文件
    await fse.outputJson(confPath, config)
  } catch (err) {
    console.error(err)
    exit()
  }
}

module.exports = defineConfig
