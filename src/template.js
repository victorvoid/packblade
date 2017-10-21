const fs = require('fs-extra')
const path = require('path')
const { dump } = require('js-yaml')
const { fromPromised, rejected, fromNodeback } = require('folktale/concurrency/task');

const fsCopy = fromPromised(fs.copy)
const fsWrite = fromPromised(fs.outputFile)
const fsReadDir = fromNodeback(require('fs').readdir)

function load(){
  return fsCopy(path.resolve(__dirname, '../template/'), 'packblade/')
    .orElse(() => {
      return rejected('An unexpected error occurred')
    })
}

function createDefaultsNames(directory){
  return fsReadDir(directory)
    .map(filesname => dump({ filesname }))
    .chain(yaml => fsWrite('packblade/roles/common/defaults/main.yml', yaml))
}

module.exports = {
  load,
  createDefaultsNames
}
