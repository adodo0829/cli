// 初始化
// 选择模版
// 创建项目目录
// download tpl

const { exit, cwd } = require('process')
const fse = require('fs-extra')
const chalk = require('chalk')
const ora = require('ora')
const tips = require('../constants/index')
const log = require('../utils/feedback')
const inquirer = require('inquirer')
const path = require('path')
const tplPath = path.resolve(__dirname, '../tpl.json')
const handleDownloadTpl = require('../utils/download')

async function init() {
  try {
    // TODO: 如果tplConfig为空, 可以加一个自动导入默认配置
    const tplConfig = (await fse.readJson(tplPath)) || {}
    const tplUrl = await getTplUrl(tplConfig)

    const dirName = await getProjectName()

    const isProjectDirExisted = await checkProjectName(dirName)
    if (isProjectDirExisted) return

    console.log(chalk.cyan(tips.PROJECT_INIT))

    const processPath = cwd()
    const dirPath = dirName.toLowerCase()
    const targetPath = `${processPath}/${dirPath}`

    handleDownloadTpl(`direct:${tplUrl}`, targetPath, dirName)
  } catch (error) {
    log.logError(error)
    exit()
  }
}

async function getTplUrl(config = {}) {
  const tlpTypeList = Object.keys(config)

  if (tlpTypeList.length === 0) {
    log.logError(tips.PROJECT_EMPTY)
    return
  }

  const listMap = tlpTypeList.map((type) => {
    return { name: type, value: type }
  })

  const KEY = 'type'
  const list = {
    type: 'list',
    name: KEY,
    message: 'Please Choose Project Type!',
    choices: listMap
  }

  const inputValue = await inquirer.prompt(list)
  const downloadUrl = config[inputValue[KEY]]

  return downloadUrl
}

async function getProjectName() {
  const KEY = 'name'
  const list = {
    type: 'input',
    name: KEY,
    message: 'Please Input Project Name!',
    // 校验函数, 函数以当前回答为参数。
    // 返回: true 通过 false 不通过,无提示 Error 不通过,显示错误信息
    validate(value) {
      return !value.length ? new Error(chalk.red('项目名称不能为空')) : true
    }
  }

  const inputValue = await inquirer.prompt(list)
  const proName = inputValue[KEY]
  return proName
}
// isProjectDirExisted
async function checkProjectName(proName) {
  const isExisted = await fse.pathExists(proName)
  if (isExisted) {
    log.logError(tips.PROJECT_EXISTED)
  }
  return isExisted
}

module.exports = init
