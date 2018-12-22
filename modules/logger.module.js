'use strict'

import values from '../lib/constants.errors.js';

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