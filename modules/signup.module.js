'use strict'

const logger = require('./logger.module.js');

const errCodeRef = {
  'firstname': 200,
  'lastname': 201,
  'email': 202,
}

const validateParams = (params) => {
  if (!params.firstname || !params.firstname.length) {
    const c = errCodeRef['firstname'];
    return { code: c, message: logger.getErrorMessage(c) };
  }

  if (!params.email || !params.email.length) {
    const c = errCodeRef['email'];
    return { code: c, message: logger.getErrorMessage(c) };
  }

  return false;
}

const register = async (params) => {
  const errors = validateParams(params);

  if (!errors) {
    // No validation errors
    // return doRegister(params);
  }
  else {
    // Found validation errors, return error
    return { success: false, error: errors };
  }
}

module.exports = {
  register
}
