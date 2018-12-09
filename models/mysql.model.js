'use strict'

import logger from '../modules/logger.module.js';
const adapter = require('../database_adapter/mysql.adapter.js');
let pool, database;

/**
 * @function init
 * @param {object} config
 */
const init = async (config) => {
  try {
    pool = await adapter.init(config);
    // console.log('pool: ', pool);
    database = pool.database;
    return pool.success;
  }
  catch (err) {
    return false;
  }
}

const checkConnection = async () => {
  if(pool) {
    return true;
  }
  else {
    const res = await init();
    return res;
  }
}

const getUserByKey = async (field, value) => {
  const con = await checkConnection();
  if(!con) {
    return { success: false, error: { code: 100, message: logger.getErrorMessage(100) } };
  }

  return new Promise(resolve => {
    database.query('SELECT * FROM users WHERE ' + field + ' = ?', value, (err, result) => {
      if(err) {
        console.error(err);
        resolve({ success: false, error: err });
      }
      else {
        resolve({ success: true, user: result[0] });
      }
    })
  });
}

const getUserByUUID = async (uuid) => {
  return getUserByKey('uuid', uuid);
  // const con = await checkConnection();
  // if(!con) {
  //   return { success: false, error: { code: 100, message: logger.getErrorMessage(100) } };
  // }

  // return new Promise(resolve => {
  //   database.query('SELECT * FROM users WHERE uuid = ?', uuid, (err, result) => {
  //     if(err) {
  //       console.error(err);
  //       resolve({ success: false, error: err });
  //     }
  //     else {
  //       resolve({ success: true, user: result[0] });
  //     }
  //   })
  // });
}


const checkEmailExistence = async (email) => {
  const record = await getUserByKey('email', email);

  return new Promise(resolve => {
    if (email) {
      if(record && record.user){
        resolve({ success: true, allowed: false  });
      }
      else {
        resolve({ success: true, allowed: true });
      }
    }
    else {
      resolve({ success: false, error: { code: 202, message: logger.getErrorMessage(202) } });
    }
  });
}

const register = async (params) => {
  const con = await checkConnection();
  if(!con) {
    return { success: false, error: { code: 100, message: logger.getErrorMessage(100) } };
  }

  const checkEmail = await checkEmailExistence(params.email);
  return new Promise(resolve => {
    if(checkEmail.success && checkEmail.allowed) {
      database.query('INSERT INTO users SET ?', params, (err, result) => {
        if(err) {
          console.error(err);
          resolve({ success: false, error: err });
        }
        else {
          // const row = await getUserByUUID(params.uuid);
          resolve(getUserByKey('uuid' ,params.uuid));
        }
      });
    }
    else {
      resolve({ success: false, error: { code: 211, message: logger.getErrorMessage(211) } });
    }
  });
};

const update = async (uuid, params) => {
  let sql = 'UPDATE users SET ';
  let keys = [];
  let values = [];
  Object.keys(params).forEach(field => {
    keys.push(field + ' = ?');
    values.push(params[field]);
  });

  sql += keys.join(', ');
  sql += ' WHERE uuid = ?'
  values.push(uuid);

  return new Promise(resolve => {
    database.query(sql, values, (error, results, fields) => {
      if (error) {
        console.log(error);
        resolve({ success: false, error: err });
      }
      else {
        console.log("results, fields");
        console.log(results, fields);
        resolve(getUserByKey('uuid' ,uuid));
      }
    });
  });
};

const activate = async (code) => {
  const record = await getUserByKey('activation_code', code);

  return new Promise(resolve => {
    if (record.success && record.user && record.user.activation_code == code) {
      database.query('UPDATE users SET activated = ? WHERE uuid = ?', [true, record.user.uuid], (err, results, fields) => {
        if (err) {
          resolve({ success: false, error: { code: 301, message: logger.getErrorMessage(301) } });
        }
        else {
          resolve(getUserByKey('activation_code', code));
        }
      })
    }
    else {
      resolve({ success: false, error: { code: 300, message: logger.getErrorMessage(300) } });
    }
  })
};

module.exports = {
  init,
  register,
  update,
  activate,
};
