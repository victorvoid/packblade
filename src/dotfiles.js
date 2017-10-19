const fs = require('fs-extra')
const { fromPromised, rejected, of } = require('folktale/concurrency/task');

const fsCopy = fromPromised(fs.copy)
const pathExists = fromPromised(fs.pathExists)

function cp(a){
  return fsCopy('dotfiles', 'packblade/roles/dotfiles/files/')
}

function exist(){
  return pathExists('dotfiles')
    .chain(exist => {
      return exist ? of(exist) : rejected(`You need create a dotfiles/ folder and put your files`)
    })
}

module.exports = {
  exist,
  cp
}
