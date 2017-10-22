const fs = require('fs-extra')
const { createATemplate } = require('./template')
const { fromNullable } = require('folktale/maybe');
const { fromPromised, rejected, of } = require('folktale/concurrency/task');

const fsCopy = fromPromised(fs.copy)
const pathExists = fromPromised(fs.pathExists)

function cp(directory){
  return fsCopy(directory, 'packblade/roles/common/files/')
}

function exist(path){
  return pathExists(path)
    .chain(exist => exist ?  of(exist)
           : /* otherwise */ rejected(`${path} not found`))
}

function Add(directory){
  return fromNullable(directory)
    .map(() =>
         exist(directory)
         .and(createATemplate(directory))
         .and(cp(directory)))
    .getOrElse(rejected(`You need to pass the path as a parameter`))
}

module.exports = Add
