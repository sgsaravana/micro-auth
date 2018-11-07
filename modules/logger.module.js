'use strict'

const values = require('../lib/constants.js');

const getErrorMessage = (code) => {

  if (values.hasOwnProperty(code.toString())) {
    return values[code];
  }
  else {
    return "Unknown error!"
  }
}

module.exports = {
  getErrorMessage
}