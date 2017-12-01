const fs = require('fs-extra')
const config = require('./config')
const template = require('./template')
const { Repository, Submodule } = require("nodegit");
const { fromPromised, rejected, of, waitAll } = require('folktale/concurrency/task');

const init = fromPromised(Repository.init)
const addSubmodule = fromPromised(Submodule.addSetup)
const fsCopy = fromPromised(fs.copy)

const GITHUB_URL = 'https://github.com/'

function createSubmodule(util, repository){
  return addSubmodule(repository,
                      `${GITHUB_URL}${util}.git`,
                      `vendor/${util.split('/')[1]}`, 0)
    .orElse(error => of(error))
}

function createAllSubmodules(utils, repository){
  return waitAll(
    utils.map(util => createSubmodule(util, repository))
  )
}

function createRepository(utils){
  return init('./packblade', 0)
    .chain(repository => createAllSubmodules(utils, repository))
}

function prepareRepository(){
  return config
    .read()
    .chain(({ utils }) => createRepository(utils))
}

function Build(){
  return template.load().and(prepareRepository())
}

module.exports = Build
