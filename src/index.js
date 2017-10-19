#!/usr/bin/env node

const meow = require('meow')
const ora = require('ora');
const updateNotifier = require('update-notifier')
const Build = require('./build')
const { rejected } = require('folktale/concurrency/task');
const { checkParameters } = require('./utils')

const cli = meow({
  description: false,
  help: `
    Usage: packblade <command>
    Where <command> is one of:
      build               Generates its ready to use package
      add     <filename>  Add a file or folder to the your package
      install <appname>   Add a role(app) to the your package
      show                Show availables roles(Applications)
    Example:
      $ packblade add spotify
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
  Build,

  NotExist: () => rejected('[ERROR] An unexpected error occurred, you need to use:')
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
