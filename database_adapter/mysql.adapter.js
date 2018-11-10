'use strict'

var mysql = require('mysql');
let config, host, port, user, password, database, pool;

const checkConnection = async (connection) => {
  return new Promise((resolve) => {
    connection.connect((err) => {
      if (err) {
        // console.log('throwing ERROR !!!!');
        resolve({ succes: false, error: err });
      }
      else {
        // console.log('no error');
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

  const result = await checkConnection(connection);
  if (result && !result.success) {
    // console.log("Error with database check: ", port, result);
    return { success: false };
  }

  return new Promise(resolve => {
    connection.query(`CREATE DATABASE IF NOT EXISTS  ${database};`, (err) => {
      if(err) {
        resolve({ success: false, error: err });
      }
      resolve({ success: true });
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

  const checkDatabase = await checkAndCreateDatabase();

  console.log("Result check database! ", checkDatabase);
  if (checkDatabase && !checkDatabase.success) {
    return { success: false };
  }

  // return new Promise(resolve => {
  // });
  try {
    const connectionPool = mysql.createPool({
      connectionLimit: pool,
      host:            host,
      user:            user,
      password:        password,
      port:            port,
      database:        database
    });
    return { success: true, database: connectionPool };
  }
  catch (err) {
    console.log("Error creating pool: ", err);
    return { success: false };
  }

};

module.exports = {
  init
};
