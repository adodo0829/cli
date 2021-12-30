const logDesc = require('../utils/logDesc')
const chalk = require('chalk')

const handleFeedback = (opreation, tplList) => {
  console.log(logDesc.SUCC, chalk.green(`${opreation} the template successful.`))
  console.log('\n')
  console.log(logDesc.INFO, chalk.grey('the latest template list is: \n'))
  console.log(tplList)
}

const handleFailed = (opreation, err) => {
  console.log(logDesc.ERR, chalk.red(`${opreation} the template failed. ${err}`))
}

const logError = (err) => {
  console.log(logDesc.ERR, chalk.red(`${err}`))
}

const logInfo = (info) => {
  console.log(logDesc.INFO, chalk.cyan(`${info}`))
}

const logNextLine = () => {
  console.log('\n')
}

module.exports = {
  handleFeedback,
  handleFailed,
  logError,
  logInfo,
  logNextLine
}
