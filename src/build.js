const config = require('./config')
const template = require('./template')
const Git = require("nodegit");
const { fromPromised, rejected } = require('folktale/concurrency/task');

const clone = fromPromised(Git.Clone)

function Build(){
  return config
    .read()
    .map(roles => {
      return clone(`https://github.com/victorvoid/packblade`, "./packblade/roles/")
        .orElse(() => {
          return rejected('error in clone')
      })
    })
}

module.exports = Build
