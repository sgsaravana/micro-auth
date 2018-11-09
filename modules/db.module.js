'use strict'

const config = require('../lib/config.js');
const connection = require(`../database_adapter/${config.dbModule}.connect.js`);
// const db = adapter.getDatabase();

const doRegister = async (params) => {
  // console.log('db');
  // console.log(config);
};

module.exports = {
    doRegister
}
