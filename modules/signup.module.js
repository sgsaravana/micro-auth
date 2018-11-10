'use strict'

import validator from 'validator';
const uuidv1 = require('uuid/v1');

import logger from './logger.module.js';
import db from './db.module.js';

const errCodeRef = {
  'firstname': 200,
  'lastname': 201,
  'email': 202,
  'invalid_email': 210
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

  if (params.email && params.email.length && !validator.isEmail(params.email)) {
    const c = errCodeRef['invalid_email'];
    return { code: c, message: logger.getErrorMessage(c) };
  }

  return false;
}

const prepareParams = (params) => {
  params.isActivated = false;
  params.activationCode = uuidv1();
  return params;
}

// ===== PUBLIC FUNCTIONS =====

const register = async (params) => {
  const errors = validateParams(params);

  if (!errors) {
    // No validation errors
    return db.doRegister(prepareParams(params));
  }
  else {
    // Found validation errors, return error
    return { success: false, error: errors };
  }
}

module.exports = {
  register
}
