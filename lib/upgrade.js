// update-notifier会异步在背后默默检查npm包的可用最新版。
// 本质就是开了child_process运行在后台，如果检查到有可用更新版，会将结果保存在.update属性中

const updateNotifier = require('update-notifier')

const chalk = require('chalk') // 版本问题

const pkg = require('../package.json')

const notifier = updateNotifier({
  pkg,
  updateCheckInterval: 1000 * 60 * 60 * 24
})

function checkUpdate() {
  if (notifier.update) {
    console.log(
      `New version available: ${chalk.cyan(
        notifier.update.latest
      )}, it's recommended that you update before using.`
    )
    notifier.notify()
  } else {
    console.log('=== version is latest ===')
  }
}

module.exports = checkUpdate
