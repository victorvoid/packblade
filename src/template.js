const fs = require('fs-extra')
const path = require('path')
const { task } = require('folktale/concurrency/task');

function load(){
  return task((resolver) => {
    fs.copy(path.resolve(__dirname, '../template/dotfiles'), 'packblade/roles/dotfiles/')
      .then(() => {
        resolver.resolve('ewkj')
      })
  })
}

module.exports = {
  load
}
