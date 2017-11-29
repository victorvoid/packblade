const fs = require('fs-extra')
const config = require('./config')
const template = require('./template')
const { Repository, Submodule } = require("nodegit");
const { fromPromised, rejected, of, waitAll } = require('folktale/concurrency/task');

const init = fromPromised(Repository.init)
const addSubmodule = fromPromised(Submodule.addSetup)
const fsCopy = fromPromised(fs.copy)

function Build(){
  return template.load().and(
    config
      .read()
      .chain(({ vendor }) => init('./packblade', 0)
          .chain(repository => waitAll(
            vendor.map( v => {
              return addSubmodule(
                repository,
                `https://github.com/${v}.git`,
                `vendor/${v.split('/')[1]}`, 0
              ).orElse(error => of(error))
            })
          ))
      )
  )
}

module.exports = Build
