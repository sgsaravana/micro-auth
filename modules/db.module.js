'use strict'

import logger from './logger.module.js';
import appConfig from '../config/app.config';
const dbConfig = require(`../config/${appConfig.dbModule}.config.js`);
const model = require(`../models/${appConfig.dbModule}.model.js`);

let isReady = false;

const init = async () => {
  if (isReady) { return true; }

  try {
    isReady = await model.init(dbConfig);
    console.log('isReady: ', isReady);
    return isReady;
  }
  catch (err) {
    console.log("ERROR : ", err);
    throw err;
  }
};

const getUser = async (field, value) => {
  if (!isReady) {
    isReady = await init();
    if (!isReady) {
      return { success: false, error: { code: 100, message: logger.getErrorMessage(100) } };
    }
  }

  try {
    const record = await model.getUserByKey(field, value);
    if(record.success && record.user) {
      return record;
    }
    else {
      return { success: false, error: { code: 320, message: logger.getErrorMessage(320) } };
    }
  }
  catch(err) {
    return err;
  }
}

const doRegister = async (params) => {
  // console.log('isReady at beginning: ', isReady);
  if (!isReady) {
    isReady = await init();
    if (!isReady) {
      return { success: false, error: { code: 100, message: logger.getErrorMessage(100) } };
    }
  }

  // Register user to the database
  try{
    const result = await model.register(params);
    return result;
  }
  catch(err) {
    console.log('err at db.module:doRegister');
    return err;
  }
};

const doActivate = async (code) => {
  if (!isReady) {
    isReady = await init();
    if (!isReady) {
      return { success: false, error: { code: 100, message: logger.getErrorMessage(100) } };
    }
  }

  // Check for user with code
  const record = await model.getUserByKey('activation_code', code);
  if(record.success && record.user) {
    const result = await model.update(record.user.uuid, {
      activated: true,
      activated_at: new Date().getTime()
    });
    return result;
  }
  else {
    return { success: false, error: { code: 300, message: logger.getErrorMessage(300) } };
  }
}

// const doResetPassword = async (params) => {
//   if (!isReady) {
//     isReady = await init();
//     if (!isReady) {
//       return { success: false, error: { code: 100, message: logger.getErrorMessage(100) } };
//     }
//   }
// }

module.exports = {
    init,
    getUser,
    doRegister,
    doActivate
}
