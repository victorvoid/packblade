const fs = require('fs-extra')
const path = require('path')
const { dump } = require('js-yaml')
const { fromPromised, rejected, of, fromNodeback } = require('folktale/concurrency/task');

const fsCopy = fromPromised(fs.copy)
const fsWrite = fromPromised(fs.outputFile)
const fsReadDir = fromNodeback(require('fs').readdir)

function load(){
  return fsCopy(path.resolve(__dirname, '../template/'), 'packblade/')
    .orElse(() => rejected('An unexpected error occurred'))
}

function createDefaults(directory){
  return fsReadDir(directory)
    .chain(fnames => fnames.length > 0 ? of(dump({ fnames }))
           :      /*  otherwise  */      rejected(`${directory} folder is empty`))
    .chain(yaml => fsWrite('packblade/roles/common/defaults/main.yml', yaml))
}

function createATemplate(directory){
  return createDefaults(directory).and(createATask(directory))
}

function createATask(directory){
  const tasks = [{
    name: `${directory} |  make ~/.config `,
    file: 'path=~/.config state=directory'
  }, {
    name: `${directory} | create backup directory`,
    file: 'path=~/.backups state=directory'
  }, {
    name: `${directory} | check for non-symlink originals`,
    command: 'test -e ~/{{ item }} -a ! -L ~/{{ item }}',
    failed_when: 'original_check.rc > 1',
    register: 'original_check',
    with_items: '{{fnames}}',
    changed_when: 'false'
  }, {
    name: `${directory} | backup originals`,
    command: [
      'mv ~/{{ item.0 }} ~/.backups/',
      'creates=~/.backups/{{ item.0 }}',
      'removes=~/{{ item.0 }}'
    ],
    with_together: [
      '{{fnames}}',
      '{{original_check.results}}'
    ],
    when:'item.1.rc == 0 # item exists and is not a symlink',
    loop_control: {
      label: '{{item.0}}'
    }
  }, {
    name: `${directory} | create symlinks`,
    file: `src={{ ansible_env.PWD }}/roles/${directory}/files/{{ item }} path= ~/{{ item }} state=link force=yes`,
    with_items: '{{fnames}}'
  }]

  const tasksYAML = dump(tasks)

  return fsWrite('packblade/roles/common/tasks/main.yml', tasksYAML)
}

module.exports = {
  load,
  createATask,
  createDefaults,
  createATemplate
}
