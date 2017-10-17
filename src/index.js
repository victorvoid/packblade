#!/usr/bin/env node

const meow = require('meow')

const cli = meow(
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
`,
  {
    alias: {
      h: 'help',
      v: 'version'
    }
  }
)

updateNotifier({ pkg: cli.pkg }).notify()
