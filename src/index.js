#!/usr/bin/env node

const meow = require('meow')
const updateNotifier = require('update-notifier')
const template = require('./template')
const dotfile = require('./dotfiles')
const fs = require('fs-extra')
const { of } = require('folktale/concurrency/task');
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

const app = dotfile
      .exist()
      .map(template.load)

app.run()
