const fs = require('fs-extra')
function createADotfilesRoles(){
  return fs.copy('dotfiles', 'lookhere/roles/dotfiles/files/')
}

module.exports = createADotfilesRoles
