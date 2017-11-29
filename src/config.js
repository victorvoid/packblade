const fs = require('fs-extra')
const { fromPromised, of, rejected } = require('folktale/concurrency/task');

const readJson = fromPromised(fs.readJson)
const fsWrite = fromPromised(fs.outputFile)

const DEFAULTS_VENDOR = ['ansible/ansible', 'pypa/virtualenv']
const DEFAULTS_ROLES = []

function read(){
  return readJson('./packblade/packblade.json')
    .chain(config =>
           ('vendor' in config) || ('roles' in config) ?
           of(config) :
           rejected('File invalid'))
    .orElse(() => createConfig().map(() => ({ vendor: DEFAULTS_VENDOR, roles: DEFAULTS_ROLES })))
}

function createConfig(){
  return fsWrite('./packblade/packblade.json', JSON.stringify({
    vendor: DEFAULTS_VENDOR
  }, null, 4))
}

module.exports = {
  read
}
