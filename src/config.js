const fs = require('fs-extra')
const { fromPromised, of, rejected } = require('folktale/concurrency/task');

const readJson = fromPromised(fs.readJson)
const fsWrite = fromPromised(fs.outputFile)

const DEFAULTS_ROLES = ['ansible/ansible', 'pypa/virtualenv']

function read(){
  return readJson('./packblade.json')
    .chain(config =>
           'roles' in config ? of(config.roles)
           : /*  otherwise  */ rejected('File invalid'))
    .orElse(() => createConfig().map(() => DEFAULTS_ROLES))
}

function createConfig(){
  return fsWrite('./packblade.json', JSON.stringify({
    roles: DEFAULTS_ROLES
  }, null, 4))
}

module.exports = {
  read
}
