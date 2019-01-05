'use strict'

const adapter = require('../database_adapter/mongodb.adapter.js');
let db;

const User = adapter.User;

/**
 * @function init
 * @param {object} config
 */
const init = async (config) => {
  try {
    db = await adapter.init(config);
    // console.log("db :: ", db.database);
    return db.success;
  }
  catch (err) {
    throw err;
  }
}

const getSearchObj = (k, v) => {
  const res = {}
  res[k] = v;
  return res;
}

const getUserByKey = async(field, value) => {
  return new Promise(resolve => {
    User.findOne(getSearchObj(field, value), (err, obj) => {
      if(err) {
        // console.error(err);
        resolve({ return: false });
      }
      else {
        resolve({ success: true, user: obj });
      }
    });
  })
};

const create = async (params) => {
  params.createdAt = new Date().getTime();
  return new Promise(resolve => {
    User.create(params, (err, obj) => {
      if(err) {
        // console.error(err);
        resolve({ success: false, error: err });
      }
      else {
        resolve(getUserByKey('uuid', params.uuid));
      }
    });
  });
};

const update = async (uuid, params) => {
  return new Promise(resolve => {
    User.findOneAndUpdate({ uuid: uuid }, params, { setDefaultsOnInsert: true }, (err, res) => {
      if(err) {
        // console.error(err);
        resolve({ success: false, error: err });
      }
      else {
        resolve(getUserByKey('uuid', uuid));
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
