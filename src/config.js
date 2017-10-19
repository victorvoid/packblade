const fs = require('fs-extra')
const { fromPromised, rejected } = require('folktale/concurrency/task');

const readJson = fromPromised(fs.readJson)

function read(){
  return readJson('./packblade.json')
    .orElse(() => {
      return rejected(`Packblade file not found: ./packblade.json`)
    })
}

module.exports = {
  read
}
