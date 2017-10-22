const { CLITypes } = require('./adts.js')
const { compose } = require('folktale/core/lambda');

function toLowerCase(x) {
    return x.toLowerCase()
}

function capitalize(word) {
  return `${word.charAt(0).toUpperCase()}${word.substring(1)}`
}

function checkParameters(input){
  const key = compose(capitalize, toLowerCase)(input)
  return key in CLITypes ?  CLITypes[key]()
    :      /* otherwise */  CLITypes.NotExist();
}

module.exports = {
  checkParameters
}
