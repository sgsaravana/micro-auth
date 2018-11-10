'use strict'

import mongoose from 'mongoose';
let config, url, dbName;

const init = async (conf) => {
  config = conf;
  url    = config.url;
  dbName = config.dbName;

  console.log("url, dbName");
  console.log(url, dbName);

  try {
    const db = await mongoose.connect(`${url}/${dbName}`);
    return { success: true, database: db.Connection };
  }
  catch (err) {
    return { success: false }
  }

}

module.exports = {
  init
};
