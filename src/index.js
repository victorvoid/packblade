#!/usr/bin/env node

const meow = require('meow')
const updateNotifier = require('update-notifier')
const chalk = require('chalk');
const Add = require('./add')
const Install = require('./install')
const Build = require('./build')
const { rejected } = require('folktale/concurrency/task');
const { checkParameters } = require('./utils')

const cli = meow({
  description: false,
  help: `
  Usage: packblade <command>
    Where <command> is one of:
      install <user/repo> Install a role(app)
      add <foldername>    Add a file or folder to the your package
      show                Show availables roles(Applications)
      build               Generates its ready to use package
    Example:
      $ packblade install spotify
      $ packblade add dotfiles
      $ packblade build
  `
},
  {
    alias: {
      h: 'help',
      v: 'version'
    }
  }
)

updateNotifier({ pkg: cli.pkg }).notify()

const app = checkParameters(cli.input[0]).matchWith({
  Build,

  Install: () => Install(cli.input[1]),

  Add: () => Add(cli.input[1]),

  NotExist: () => rejected('An unexpected error occurred, you need to use:')
})

app
  .run()
  .promise()
  .then(() => {
    console.log(chalk.bold.green(`✔ Success!`))
  })
  .catch((errorMessage) => {
    console.log(chalk.bold.red(`✖ [ERROR] ${errorMessage}`))
    cli.showHelp()
  })
