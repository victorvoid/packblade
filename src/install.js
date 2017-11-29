const fs = require('fs-extra')
const config = require('./config')
const { fromNullable } = require('folktale/maybe');
const { fromPromised, of, rejected } = require('folktale/concurrency/task');

const fsWrite = fromPromised(fs.outputFile)

function Install(repository){
  return fromNullable(repository)
    .map(() =>
         config
         .read()
         .chain(config => {
           return fsWrite('./packblade/packblade.json', JSON.stringify({...config, roles: [...config.roles, repository]}, null, 4))
         })
         .orElse(() => fsWrite('./packblade.json', JSON.stringify({ roles: [repository] }, null, 4))))
    .getOrElse(rejected(`You need to pass the githubuser/repositoryname as a parameter`))
}

module.exports = Install
