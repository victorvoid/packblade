const fs = require('fs-extra')
const template = require('./template')
const { fromNullable } = require('folktale/maybe');
const { fromPromised, rejected, of } = require('folktale/concurrency/task');

const fsCopy = fromPromised(fs.copy)
const pathExists = fromPromised(fs.pathExists)

function cp(directory){
  return fsCopy(directory, 'packblade/roles/my/files/')
}

function exist(path){
  return pathExists(path)
    .chain(exist => {
      return exist ? of(exist) : rejected(`${path} not found`)
    })
}

function Add(directory){
  return fromNullable(directory)
    .map(() => {
      return exist(directory)
        .and(template.load())
        .and(cp(directory))
    }).getOrElse(rejected(`You need to pass the path as a parameter`))
}

module.exports = Add
