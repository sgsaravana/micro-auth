
const adapter = require('./mongodb.adapter.js');

let db;

const checkConnection = async () => {
  try {
    db = await adapter.init();
    console.log("db :: ", db.database);
  }
  catch (err) {
    throw err;
  }
}

// const register = () => {};

// const activate = () => {};

checkConnection();

module.exports = {
  // checkConnection,
  // register,
  // activate
};
