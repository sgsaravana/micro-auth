'use strict'

const config = require('../lib/config.js');
const db = config.db_module;

const doRegister = async (params) => {
    console.log('db');
    console.log(config);
};

module.exports = {
    doRegister
}
