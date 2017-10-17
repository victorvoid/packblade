const fs = require('fs-extra')
const { task } = require('folktale/concurrency/task');

function cp(){
  return task(resolver => {
    fs.copy('dotfiles', 'packblade/roles/dotfiles/files/')
      .then(() => resolver.resolve('Files copied'))
      .catch(err => resolver.reject(err))
  })
}

function exist(){
  return task(resolver => {
    fs.pathExists('dotfiles')
      .then(exist => {
        return exist ?
          resolver.resolve(exist) :
          resolver.reject(`You need create a dotfiles/ folder and put your files`)
      })
  })
}

module.exports = {
  exist,
  cp
}
