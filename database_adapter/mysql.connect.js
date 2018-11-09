
const adapter = require('./mysql.adapter.js');

let pool;

const checkConnection = async () => {
  pool = await adapter.init();
  console.log('pool: ', pool);
}

// const register = () => {};

// const activate = () => {};

checkConnection();

module.exports = {
  // checkConnection,
  // register,
  // activate
};
