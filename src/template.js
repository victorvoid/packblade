const fs = require('fs-extra')
const path = require('path')
const { fromPromised, rejected } = require('folktale/concurrency/task');

const fsCopy = fromPromised(fs.copy)

function load(){
  return fsCopy(path.resolve(__dirname, '../template/'), 'packblade/')
    .orElse(() => {
      return rejected('An unexpected error occurred')
    })
}

module.exports = {
  load
}
