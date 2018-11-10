'use strict'

var mysql = require('mysql');
let config, host, port, user, password, database, pool;

const checkConnection = async (connection) => {
  try {
    connection.connect();
    return {success: true};
  }
  catch (e) {
    return {success: false, error: e};
  }
}

const checkAndCreateDatabase = async () => {

  const connection = mysql.createConnection({
    host:     host,
    port:     port,
    user:     user,
    password: password || ""
  });

  const result = await checkConnection(connection);
  if (!result || !result.success) {
    console.log("Error with database check: ", result.error);
    return {success: false};
  }

  try {
    connection.query(`CREATE DATABASE IF NOT EXISTS  ${database};`);
    return {success: true};
  }
  catch(e) {
    return {success: false, error: e};
  }

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

  if (!checkDatabase || !checkDatabase.success) {
    console.log("Error creating database! ", checkDatabase.error);
    return { success: false };
  }

  try {
    const connectionPool = await mysql.createPool({
      connectionLimit: pool,
      host:            host,
      user:            user,
      password:        password,
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
