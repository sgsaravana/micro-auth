'use strict'

import logger from './logger.module.js';
import appConfig from '../config/app.config';
const dbConfig = require(`../config/${appConfig.dbModule}.config.js`);
const model = require(`../models/${appConfig.dbModule}.model.js`);

let isReady = false;

const init = async () => {
  if (isReady) { return true; }

  isReady = await model.init(dbConfig);
  console.log('isReady: ', isReady);
  return isReady;
};

const dbChecker = async () => {
  if (!isReady) {
    isReady = await init();
    if (!isReady) {
      return { success: false, error: { code: 100, message: logger.getErrorMessage(100) } };
    }
  }
}

const getUser = async (field, value) => {
  await dbChecker();

  // Get user by key
  const record = await model.getUserByKey(field, value);
  if(record.success && record.user) {
    return record;
  }
  else {
    return { success: false, error: { code: 320, message: logger.getErrorMessage(320) } };
  }
}

const doRegister = async (params) => {
  await dbChecker();

  // Register user to the database
  const record = await model.create(params);
  return record;
};

const doUpdate = async (uuid, params) => {
  await dbChecker();

  // Check for user with code
  const record = await model.getUserByKey('uuid', uuid);
  if(record.success && record.user) {
    const result = await model.update(record.user.uuid, params);
    return result;
  }
  else {
    return { success: false, error: { code: 320, message: logger.getErrorMessage(320) } };
  }
}

module.exports = {
    init,
    getUser,
    doRegister,
    doUpdate
}
