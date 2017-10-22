const config = require('./config')
const template = require('./template')
const { Repository, Submodule } = require("nodegit");
const { fromPromised, rejected, waitAll } = require('folktale/concurrency/task');

const init = fromPromised(Repository.init)
const addSubmodule = fromPromised(Submodule.addSetup)

function Build(){
  return config
    .read()
    .chain(roles => {
      return init('./packblade', 0)
        .chain(repository => waitAll(
          roles.map(role => {
            return addSubmodule(repository, `https://github.com/${role}.git`, `vendor/${role.split('/')[1]}`, 0)
          })
        ))
    })
}

module.exports = Build
