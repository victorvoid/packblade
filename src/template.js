const fs = require('fs-extra')
const path = require('path')
const { dump } = require('js-yaml')
const { fromPromised, rejected, fromNodeback } = require('folktale/concurrency/task');

const fsCopy = fromPromised(fs.copy)
const fsEnsureFile = fromPromised(fs.ensureFile)
const fsReadDir = fromNodeback(require('fs').readdir)
const fsWriteFile = fromNodeback(require('fs').writeFile)

function load(){
  return fsCopy(path.resolve(__dirname, '../template/'), 'packblade/')
    .orElse(() => {
      return rejected('An unexpected error occurred')
    })
}

function createDefaultsNames(directory){
  return fsReadDir('dotfiles')
    .map(filesname => dump({ filesname }))
    .chain(yaml => fsEnsureFile('packblade/roles/common/defaults/main.yml')
        .chain( () => fsWriteFile('packblade/roles/common/defaults/main.yml', yaml))
    )
}

module.exports = {
  load,
  createDefaultsNames
}
