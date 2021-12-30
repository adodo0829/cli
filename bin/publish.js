const { writeFileSync } = require('fs')
const child_process = require('child_process')
const pkg = require('../package.json')

const cpPkg = { ...pkg }
cpPkg.version = handleType(pkg.version)

try {
  // 修改版本号
  writeFileSync('package.json', JSON.stringify(cpPkg, null, 2))
  console.log('pkg is publish...')
  child_process.execSync(`npm publish`)
} catch (error) {
  console.log('=== 更新失败 ===')
}
console.log('=== 当前package的version为: %s ===', cpPkg.version)

/**
 * 根据分支类型处理版本号version
 * @param {string} oldVersion 旧的版本号
 * @param {string} type 分支类型
 * @private
 */
function handleType(oldVersion) {
  let oldVersionArr = oldVersion.split('.')
  // 版本号第一位 如：1.2.3 则为 1
  let firstNum = Number(oldVersionArr[0])
  // 版本号第二位 如：1.2.3 则为 2
  let secondNum = Number(oldVersionArr[1])
  // 版本号第三位 如：1.2.3 则为 3
  let thirdNum = Number(oldVersionArr[2])

  return `${firstNum}.${secondNum}.${thirdNum + 1}`
}
