'use strict'

const adapter = require('./mongodb.adapter.js');
let db;

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

const register = () => {};

// const activate = () => {};

module.exports = {
  init,
  register,
  // activate
};
