const { CLITypes } = require('./adts.js')

function capitalize(word) {
  return `${word.charAt(0).toUpperCase()}${word.substring(1).toLowerCase()}`
}

function checkParameters(input){
  const key = input ? capitalize(input) : ''
  return key in CLITypes ?  CLITypes[key]()
    :      /* otherwise */  CLITypes.NotExist();
}

module.exports = {
  checkParameters,
  capitalize
}
