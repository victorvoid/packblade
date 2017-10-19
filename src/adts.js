const union = require('folktale/adt/union/union');

const CLITypes = union('CLICheck', {
  Build(){
    return {}
  },

  Add() {
    return {}
  },

  Install(){
    return {}
  },

  Show(value) {
    return {}
  },

  NotExist() {
    return {}
  }
});

module.exports = {
  CLITypes
}
