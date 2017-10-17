#!/usr/bin/env node

const meow = require('meow')
const updateNotifier = require('update-notifier')
const createADotfilesRoles = require('./dotfiles')

const cli = meow({
  description: false,
  help:
    `
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

const run = async () => {
  const handleLoadDotfiles = createADotfilesRoles()
  handleLoadDotfiles
    .then(() => {
      console.log('success!!')
    })
    .catch(() => {
      console.log('You need create a dotfiles/ folder and put your files')
      cli.showHelp()
    })
}

run()
