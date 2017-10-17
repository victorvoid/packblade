#!/usr/bin/env node

const meow = require('meow')
const ora = require('ora');
const updateNotifier = require('update-notifier')
const template = require('./template')
const dotfile = require('./dotfiles')
const { rejected } = require('folktale/concurrency/task');


const cli = meow({
  description: false,
  help: `
    Usage:
      $ lookhere                Get yours files/dotfiles in current path and generate a role with files
      $ lookhere install        Install your apps and create the symbolic links for yours dotfiles
      $ lookhere <appname>      Generate a role of the app
      $ lookhere ls             Show availables roles(Applications)
    Example:
      $ lookhere
      $ lookhere spotify
      $ lookhere ls
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

const app = dotfile
  .exist()
  .map(template.load)
  .map(dotfile.cp)
  .orElse((errorMessage) => {
    spinner.fail(errorMessage)
    return rejected(errorMessage)
  })

app
  .run()
  .promise()
  .then(() => {
    spinner.succeed(`
      Success! Now you can enter the folder lookhere/ and install with:
      $ lookhere install
    `)
  })
  .catch(() => {
    cli.showHelp()
  })
