#!/usr/bin/env node

const meow = require('meow')
const ora = require('ora');
const updateNotifier = require('update-notifier')
const Add = require('./add')
const { rejected } = require('folktale/concurrency/task');
const { checkParameters } = require('./utils')

const cli = meow({
  description: false,
  help: `
    Usage: packblade <command>
    Where <command> is one of:
      install <appname>   Add a role(app) to the your package
      add     <foldername>  Add a file or folder to the your package
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
const spinner = ora('Loading... \n').start();

const app = checkParameters(cli.input[0]).matchWith({
  Add: () => Add(cli.input[1]),

  NotExist: () => rejected('An unexpected error occurred, you need to use:')
})

app
  .run()
  .promise()
  .then(() => {
    spinner.succeed(`
      Success! generated in the ./packblade/
    `)
  })
  .catch((errorMessage) => {
    spinner.fail(`[ERROR] ${errorMessage}`)
    cli.showHelp()
  })
