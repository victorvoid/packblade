const fs = require('fs-extra')
const { task } = require('folktale/concurrency/task');

function create(){
  return fs.copy('dotfiles', 'lookhere/roles/dotfiles/files/')
}

function exist() {
  return task(resolver => fs.pathExists('dotfiles')
              .then(exist =>
                    exist ? resolver.resolve(exist) : resolver.reject(false)))
}

module.exports = {
  exist,
  create
}
