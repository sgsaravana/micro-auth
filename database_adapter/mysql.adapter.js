'use strict'

var mysql = require('mysql');

import schema from './mysql.schema.js';

let config, host, port, user, password, database, pool;

const checkConnection = async (connection) => {
  return new Promise((resolve) => {
    connection.connect((err) => {
      if (err) {
        console.log('throwing ERROR !!!!');
        resolve({ succes: false, error: err });
      }
      else {
        console.log('no error');
        resolve({ success: true });
      }
    });
  });
}

const checkAndCreateDatabase = async () => {
  let connection;
  connection = mysql.createConnection({
    host:     host,
    port:     port,
    user:     user,
    password: password || ""
  });

  checkConnection(connection)
    .then(result => {
      if (result && !result.success) {
        console.log("Error with database check: ", port, result);
        return { success: false };
      }
    });

  return new Promise(resolve => {
    console.log("Creating database...");
    connection.query(`CREATE DATABASE IF NOT EXISTS  ${database};`, (err) => {
      if(err) {
        resolve({ success: false, error: err });
      }
      resolve({ success: true });
    });
  });
}

const executeSchemaOperation = async (pool) => {
  return new Promise(resolve => {
    const query = schema.users();
    pool.query(query, (err, result) => {
      if(err) {
        // console.error(err);
        resolve({ success: false, error: err });
      }
      else {
        resolve({ success: true });
      }
    });
  });
}

const init = async (conf) => {
  config   = conf;
  host     = config.host;
  port     = config.port;
  user     = config.user;
  password = config.password;
  database = config.database;
  pool     = config.pool;


  return new Promise(async resolve => {

    checkAndCreateDatabase().then(checkDatabase => {
      console.log("Result check database! ", checkDatabase);
      if (checkDatabase && !checkDatabase.success) {
        resolve({ success: false });
      }
    });

    const connectionPool = mysql.createPool({
      connectionLimit: pool,
      host:            host,
      user:            user,
      password:        password,
      port:            port,
      database:        database
    });

    executeSchemaOperation(connectionPool).then(checkSchema => {
      if(checkSchema && !checkSchema.succes) {
        resolve({ success: true, database: connectionPool });
      }
      else {
        resolve({ succes: false });
      }
    });

  });
  // catch (err) {
  //   console.error("Error creating pool: ", err);
  //   return { success: false, error: err };
  // }

};

module.exports = {
  init
};
