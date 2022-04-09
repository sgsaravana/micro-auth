'use strict'

import validator from 'validator';
const bcrypt = require('bcrypt');
const uuidv1 = require('uuid/v1');

import config from '../config/app.config.js';
import logger from './logger.module.js';
import passwd from './password.module.js';
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
  const password = await passwd.generatePassword(params.password);
  return new Promise(resolve => {
    params.isActivated = !config.activationRequired;
    params.activationCode = uuidv1();
    params.activationCodeGeneratedAt = new Date().getTime();
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
  console.log('RECORD :: ', record);
  if(record.success) {
    if(record.user) {
      // User already exist. Return error message
      return { success: false, error: { code: 211, message: logger.getErrorMessage(211) } };
    }
    else {
      const createParams = await prepareParams(params);
      const result       = await db.doRegister(createParams);
      return result;
    }
  }
  else {
    return record;
  }
  // if(!record.success && record.error.code != 320) {
  //   return { success: false, error: { code: 322, message: logger.getErrorMessage(322) } };
  // }

  // console.log('CREATING :: ', params);
  // if (!errors && !record.success && record.error.code === 320 && !record.user) {
  //   // No validation errors
  //   const createParams = await prepareParams(params);
  //   const result       = await db.doRegister(createParams);
  //   return result;
  // }
}

module.exports = { register }
