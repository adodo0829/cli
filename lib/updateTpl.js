const chalk = require('chalk')
const path = require('path')
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

  // 修改配置
  try {
    tplConfig[tplName] = tplAddress
    await fse.writeJson(tplPath, tplConfig)
    feedBack.handleFeedback('update', tplConfig)
  } catch (err) {
    feedBack.handleFailed('update', err)
    exit()
  }
}

function verifyName(name, config) {
  if (name === '') {
    console.log(`${chalk.red(tips.NAME_EMPTY)}`)
    exit()
  } else {
    if (config && !config[name]) {
      console.log(`${chalk.red(tips.NAME_NOT_EXISTED)}`)
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
