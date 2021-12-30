// 下载单文件, 文件目录clone不下来, 需要打包成zip或者其他压缩文件
// const download = require('download')
const download = require('download-git-repo')
const ora = require('ora')
const { exit } = require('process')
const chalk = require('chalk')
const { logNextLine } = require('./feedback')

function downloadAndSave(tplAddress, targetPath, dirName) {
  logNextLine()
  const spinner = ora(chalk.cyan('Downloading template...'))
  spinner.start()
  logNextLine()

  try {
    // 需要解压缩
    // await download(tplAddress, targetPath, { extract: true })
    download(tplAddress, targetPath, { clone: true }, (err) => {
      if (err) {
        spinner.text = chalk.red(`Download template failed. ${err}`)
        spinner.fail()
        exit(1)
      }

      spinner.text = chalk.green('Initialize project successful.')
      spinner.succeed()

      console.log(`\n To get started: \n`)
      console.log(`   cd ${chalk.yellow(dirName)} \n`)
      console.log(`   ${chalk.yellow('npm install')} or ${chalk.yellow('yarn install')}`)
      console.log(`   ${chalk.yellow('npm run dev')} or ${chalk.yellow('yarn dev')}`)
    })
  } catch (err) {
    spinner.text = chalk.red(`Download template failed. ${err}`)
    spinner.fail()
    exit(1)
  }
}

module.exports = downloadAndSave
