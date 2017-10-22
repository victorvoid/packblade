const fs = require('fs-extra')
const { fromPromised, of, rejected } = require('folktale/concurrency/task');

const readJson = fromPromised(fs.readJson)

function read(){
  return readJson('./packblade.json')
    .chain(config =>
           'roles' in config ? of(config.roles)
           : /*  otherwise  */ rejected('File invalid'))
    .orElse(() => rejected(` Packblade: file not found: ./packblade.json`))
}

module.exports = {
  read
}
