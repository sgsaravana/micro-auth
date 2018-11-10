'use strict'

const adapter = require('../database_adapter/mongodb.adapter.js');
let db;

/**
 * @function init
 * @param {object} config
 */
const init = async (config) => {
  try {
    db = await adapter.init(config);
    console.log("db :: ", db.database);
    return db.success;
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
