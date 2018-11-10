'use strict'

import logger from './logger.module.js';
import config from '../lib/config.js';
const model = require(`../database_adapter/${config.dbModule}.connect.js`);

let isReady = false;

const init = async () => {
  if (isReady) { return true; }

  try {
    isReady = await model.init(config);
    console.log('isReady: ', isReady);
    return isReady;
  }
  catch (err) {
    console.log("ERROR : ", err);
    throw err;
  }
};

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

// const doActivate = async (params) => {
//   if (!isReady) {
//     isReady = await init();
//     if (!isReady) {
//       return { success: false, error: { code: 100, message: logger.getErrorMessage(100) } };
//     }
//   }
// }

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
    doRegister,
    // doActivate,
    // doResetPassword
}
