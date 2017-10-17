const fs = require('fs-extra')
const path = require('path')

function load(){
  return fs.copy(path.resolve(__dirname, '../template/dotfiles'), 'lookhere/roles/dotfiles/')
}

module.exports = {
  load
}
