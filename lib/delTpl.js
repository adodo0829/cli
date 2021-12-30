const path = require('path')
const { exit } = require('process')
const fse = require('fs-extra')
const chalk = require('chalk');
const logDesc = require('../utils/logDesc')

const tplPath = path.resolve(__dirname, '../tpl.json')

async function delTpl(tplName) {
  const tplConfig = await fse.readJson(tplPath)

  if (tplName === '') {
    console.log(logDesc.ERR, `${chalk.red('template name cannot be empty!')}`)
    exit()
  } else {
    if (tplConfig && tplConfig[tplName]) {
      try {
        delete tplConfig[tplName]
        await fse.writeJson(tplPath, tplConfig)
        console.log(logDesc.SUCC, chalk.green('delete the template successful.'))
        console.log('\n')
        console.log(logDesc.INFO, chalk.grey('the latest template list is: \n'))
        console.log(tplConfig)
      } catch (error) {
        console.log(logDesc.ERR, chalk.red(`delete the template failed. ${error}`))
      }
    } else {
      console.log(`${chalk.yellow('template name not exists!')}`)
      exit()
    }
  }
}

module.exports = delTpl
