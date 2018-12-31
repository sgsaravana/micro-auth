'use strict'

import validator from 'validator';
const bcrypt = require('bcrypt');
const uuidv1 = require('uuid/v1');

import config from '../config/app.config.js';
import logger from './logger.module.js';
import auth from './auth.module.js';
import db from './db.module.js';

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
  const password = await auth.generatePassword(params.password);
  return new Promise(resolve => {
    params.isActivated = false;
    params.activationCode = uuidv1();
    params.password = password;
    resolve(params);
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

const activate = async (code) => {
  return db.doActivate(code);
}

module.exports = {
  register,
  activate
}
