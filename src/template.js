const fs = require('fs-extra')
const path = require('path')
const { task } = require('folktale/concurrency/task');

function load(){
  return task((resolver) => {
    fs.copy(path.resolve(__dirname, '../template/'), 'packblade/')
      .then(() => {
        resolver.resolve('')
      })
      .catch(() => {
        resolver.reject('An unexpected error occurred')
      })
  })
}

module.exports = {
  load
}
