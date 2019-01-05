'use strict'

import mongoose from 'mongoose';
const User = require('./mongodb.user.schema.js');

let config, url, dbName;

const init = async (conf) => {
  config = conf;
  url    = config.url;
  dbName = config.dbName;

  try {
    const db = await mongoose.connect(`${url}/${dbName}`);

    console.log('=== connected to mongo ===');
    return { success: true, database: db.Connection };
  }
  catch (err) {
    // console.error('=== mongo connect error ===', err);
    return { success: false }
  }

}

module.exports = {
  init,
  User
};
