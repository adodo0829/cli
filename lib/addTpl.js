const chalk = require('chalk')
const path = require('path')
// 监听器函数必须只执行同步的操作。 
// Node.js 进程将在调用 'exit' 事件监听器之后立即退出，从而使任何仍在事件循环中排队的其他工作被丢弃
const { exit } = require('process')
const fse = require('fs-extra')
const feedBack = require('../utils/feedback')
const tips = require('../constants/index')
const tplPath = path.resolve(__dirname, '../tpl.json')

async function addTpl(tplName, tplAddress) {
  // 读取本地配置
  const tplConfig = await fse.readJson(tplPath)

  // 输入校验
  verifyName(tplName, tplConfig)
  verifyAddress(tplAddress)

  // 写入配置
  try {
    tplConfig[tplName] = tplAddress
    await fse.writeJson(tplPath, tplConfig)
    feedBack.handleFeedback('add', tplConfig)
  } catch (err) {
    feedBack.handleFailed('add', err)
    exit()
  }
}

function verifyName(name, config) {
  if (name === '') {
    console.log(`${chalk.red(tips.NAME_EMPTY)}`)
    exit()
  } else {
    if (config && config[name]) {
      console.log(`${chalk.yellowBright(tips.NAME_EXISTED)}`)
      exit()
    }
  }
}

function verifyAddress(address) {
  if (address === '') {
    console.log(chalk.red(tips.PARAM_EMPTY))
    exit()
  }
}

module.exports = addTpl
