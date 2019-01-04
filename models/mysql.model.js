'use strict'

import logger from '../modules/logger.module.js';
import utils from '../lib/utils';
const adapter = require('../database_adapter/mysql.adapter.js');
let pool, database;

/**
 * @function init
 * @param {object} config
 */
const init = async (config) => {
  try {
    pool = await adapter.init(config);
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

const generateQueryParams = (params) => {
  const res = {};
  for(const key in params) {
    res[utils.toSnakeCase(key)] = params[key];
  }
  return res;
}

const generateCamelCaseObj = (obj) => {
  const res = {};
  for(const key in obj) {
    res[utils.toCamelCase(key)] = obj[key];
  }
  return res;
}

const getUserByKey = async (field, value) => {
  const con = await checkConnection();
  if(!con) {
    return { success: false, error: { code: 100, message: logger.getErrorMessage(100) } };
  }

  return new Promise(resolve => {
    database.query('SELECT * FROM users WHERE ' + utils.toSnakeCase(field) + ' = ?', value, (err, result) => {
      if(err) {
        console.error(err);
        resolve({ success: false, error: err });
      }
      else {
        // console.log("RESULT :: ", generateCamelCaseObj(result[0]));
        resolve({ success: true, user: generateCamelCaseObj(result[0]) });
      }
    });
  });
}

const create = async (params) => {
  const con = await checkConnection();
  if(!con) {
    return { success: false, error: { code: 100, message: logger.getErrorMessage(100) } };
  }

  // const createParams = generateQueryParams(params);
  return new Promise(resolve => {
    database.query('INSERT INTO users SET ?', generateQueryParams(params), (err, result) => {
      if(err) {
        console.error(err);
        resolve({ success: false, error: err });
      }
      else {
        resolve(getUserByKey('uuid' ,params.uuid));
      }
    });
  });
};

const update = async (uuid, params) => {
  let sql = 'UPDATE users SET ';
  let keys = [];
  let values = [];
  Object.keys(params).forEach(field => {
    keys.push(utils.toSnakeCase(field) + ' = ?');
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

module.exports = {
  init,
  getUserByKey,
  create,
  update
};
