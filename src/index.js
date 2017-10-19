#!/usr/bin/env node

const meow = require('meow')
const ora = require('ora');
const updateNotifier = require('update-notifier')
const template = require('./template')
const dotfiles = require('./dotfiles')

const cli = meow({
  description: false,
  help: `
    Usage: packblade <command>
    Where <command> is one of:
      build            Generates its ready to use package
      add <appname>    Add a role(app) to the your package
      ls               Show availables roles(Applications)
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

if(cli.input[0] === 'build'){
  const app = dotfiles
    .exist()
    .and(template.load())
    .and(dotfile.cp())

  app
    .run()
    .promise()
    .then(() => {
      spinner.succeed(`
        Success! Now you can enter the folder packblade/ and install with:
        $ packblade install
      `)
    })
    .catch((errorMessage) => {
      spinner.fail(errorMessage)
      cli.showHelp()
    })
}else{
  spinner.fail('An unexpected error occurred, you need to use:')
  cli.showHelp()
}
