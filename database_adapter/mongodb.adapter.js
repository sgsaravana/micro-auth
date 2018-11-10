
import mongoose from 'mongoose';

// const Schema = mongoose.Schema;
const config = require('../lib/config.js');

const url    = config.url;
const dbName = config.dbName;

const init = async () => {
  console.log("url, dbName");
  console.log(url, dbName);

  try {
    const db = await mongoose.connect(`${url}/${dbName}`);
    return { success: true, database: db.Connection };
  }
  catch (err) {
    return {success: false}
  }

}

module.exports = {
  init
};
