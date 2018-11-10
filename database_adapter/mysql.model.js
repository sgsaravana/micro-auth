'use strict'

const adapter = require('./mysql.adapter.js');
let pool;

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

const register = () => {};

// const activate = () => {};

module.exports = {
  init,
  register,
  // activate
};
