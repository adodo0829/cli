#!/usr/bin/env node

const program = require('commander')
const checkUpdate = require('../lib/upgrade')
const displayList = require('../lib/list')
const addTpl = require('../lib/addTpl')
const delTpl = require('../lib/delTpl')
const updateTpl = require('../lib/updateTpl')
const init = require('../lib/init')

// commander: 添加命令名称
// option: 定义commander的选项options

// 通过option设置的选项可以通过program['xxx']来访问。
// 通过command设置的命令通常在action回调中来访问和处理

program.version(require('../package.json').version, '-v, --version')

/**
 * 检查更新
 */
program
  .command('upgrade')
  .description('check my-cli version')
  .action(() => {
    checkUpdate()
  })

/**
 * 展示配置
 */
program
  .command('list')
  .description('display all template config')
  .action(() => {
    displayList()
  })

/**
 * 添加配置
 */
program
  // <必填参数>  [可选参数]
  .command('add <tplName> <tplAddress>')
  .description('add a template config')
  .action((tplName, tplAddress) => {
    addTpl(tplName, tplAddress)
  })

/**
 * 删除配置
 */
program
  .command('delete <tplName>')
  .description('delete a template config')
  .action((tplName) => {
    delTpl(tplName)
  })

/**
 * 更新配置
 */
program
  .command('update <tplName> <tplAddress>')
  .description('update a template config')
  .action((tplName, tplAddress) => {
    updateTpl(tplName, tplAddress)
  })

/**
 * 初始化项目
 */
program
  .command('init')
  .description('init a project')
  .action(() => {
    init()
  })

program.parse(process.argv)
