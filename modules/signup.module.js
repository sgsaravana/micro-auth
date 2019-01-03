'use strict'

import validator from 'validator';
const bcrypt = require('bcrypt');
const uuidv1 = require('uuid/v1');

import config from '../config/app.config.js';
import logger from './logger.module.js';
import auth from './password.module.js';
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
    params.isActivated = !config.activationRequired;
    params.activationCode = uuidv1();
    params.activation_code_generated_at = new Date().getTime();
    params.password = password;
    resolve(params);
  });
}

// ===== PUBLIC FUNCTIONS =====

const register = async (params) => {
  // Check for validation errors
  const errors = validateParams(params);
  if (errors) {
    // Found validation errors, return error
    return { success: false, error: errors };
  }

  // Check if user record exist
  const record = await db.getUser('email', params.email);
  if(record.success && record.user) {
    // User already exist. Return error message
    return { success: false, error: { code: 211, message: logger.getErrorMessage(211) } };
  }

  if(!record.success) {
    return { success: false, error: { code: 322, message: logger.getErrorMessage(322) } };
  }

  if (!errors && record.success && !record.user) {
    // No validation errors
    return db.doRegister(await prepareParams(params));
  }
}

module.exports = { register }
