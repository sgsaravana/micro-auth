'use strict'

import validator from 'validator';
const bcrypt = require('bcrypt');
const uuidv1 = require('uuid/v1');

import logger from './logger.module.js';
import db from './db.module.js';

const saltRounds = 12;
const errCodeRef = {
  'firstname': 200,
  'lastname': 201,
  'email': 202,
  'password': 203,
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

  if (!params.password || !params.password.length) {
    const c = errCodeRef['password'];
    return { code: c, message: logger.getErrorMessage(c) };
  }

  if (params.email && params.email.length && !validator.isEmail(params.email)) {
    const c = errCodeRef['invalid_email'];
    return { code: c, message: logger.getErrorMessage(c) };
  }

  return false;
}

const prepareParams = async params => {
  return new Promise(resolve => {
    params.isActivated = false;
    params.activationCode = uuidv1();
    bcrypt.hash(params.password, saltRounds).then((err, hash) => {
      params.password = hash;
      resolve(params);
    });
  });
}

// ===== PUBLIC FUNCTIONS =====

const register = async (params) => {
  const errors = validateParams(params);

  if (!errors) {
    // No validation errors
    return db.doRegister(await prepareParams(params));
  }
  else {
    // Found validation errors, return error
    return { success: false, error: errors };
  }
}

const activate = async (done) => {}

module.exports = {
  register,
  activate
}
