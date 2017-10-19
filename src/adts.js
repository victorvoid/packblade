const union = require('folktale/adt/union/union');

const CLITypes = union('CLICheck', {
  build(value){
    return { value };
  },

  add(value) {
    return { value };
  },

  ls(value) {
    return { value };
  }
});

module.exports = {
  CLITypes
}
