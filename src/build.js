const dotfiles = require('./dotfiles')
const template = require('./template')

function Build(){
  return dotfiles
    .exist()
    .and(template.load())
    .and(dotfiles.cp())
}

module.exports = Build
