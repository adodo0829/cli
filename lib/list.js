const fse = require('fs-extra')
const path = require('path')
const logDesc = require('../utils/logDesc');
const chalk = require('chalk');

const tplPath = path.resolve(__dirname, '../tpl.json')

async function displayList() {
  const tplConfig = await fse.readJson(tplPath)
  console.log('\n')
  console.log(logDesc.INFO, chalk.cyan('the latest template list is: \n'))
  console.log(tplConfig)
}

module.exports = displayList
