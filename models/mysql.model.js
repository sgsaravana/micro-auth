'use strict'

const adapter = require('../database_adapter/mysql.adapter.js');
let pool;

/**
 * @function init
 * @param {object} config
 */
const init = async (config) => {
  try {
    pool = await adapter.init(config);
    console.log('pool: ', pool);
    return pool.success;
  }
  catch (err) {
    throw err;
  }
}

// const register = () => {};

// const update = () => {};

// const activate = () => {};

// const forgot = () => {};

// const reset = () => {};

module.exports = {
  init,
  // register,
  // update,
  // activate,
  // forgot,
  // reset,
};
