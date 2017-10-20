const { CLITypes } = require('./adts.js')

function checkParameters(input){
  const key = input ? `${input.charAt(0).toUpperCase()}${input.slice(1)}`: ''
  return key in CLITypes ?  CLITypes[key]()
    :      /* otherwise */  CLITypes.NotExist();
}

module.exports = {
  checkParameters
}
