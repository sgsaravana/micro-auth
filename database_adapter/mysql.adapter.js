
const config = require('../lib/config.js');

var mysql = require('mysql');

const host     = config.host;
const port     = config.port;
const user     = config.user;
const password = config.password;
const database = config.database;
const pool     = config.pool;

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

const init = async () => {
  const checkDatabase = await checkAndCreateDatabase();

  if (!checkDatabase || !checkDatabase.success) {
    console.log("Error creating database! ", checkDatabase.error);
    return;
  }

  try {
    const pool = await mysql.createPool({
      connectionLimit: pool,
      host:            host,
      user:            user,
      password:        password,
      database:        database
    });
    return { success: true, database: pool };
  }
  catch (err) {
    throw err
  }
};

module.exports = {
  init
};
