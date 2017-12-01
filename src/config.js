const fs = require('fs-extra')
const { fromPromised, of, rejected } = require('folktale/concurrency/task');

const readJson = fromPromised(fs.readJson)
const fsWrite = fromPromised(fs.outputFile)

const DEFAULTS_UTILS = ['ansible/ansible', 'pypa/virtualenv']
const DEFAULTS_ROLES = []

function read(){
  return readJson('./packblade/packblade.json')
    .chain(config =>
           ('utils' in config) || ('roles' in config) ?
           of(config) :
           rejected('File invalid'))
    .orElse(() => createConfig().map(() => ({ utils: DEFAULTS_UTILS, roles: DEFAULTS_ROLES })))
}

function createConfig(){
  return fsWrite('./packblade/packblade.json', JSON.stringify({
    utils: DEFAULTS_UTILS
  }, null, 4))
}

module.exports = {
  read
}
