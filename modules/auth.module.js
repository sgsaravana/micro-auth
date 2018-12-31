'use strict'

const bcrypt = require('bcrypt');

import config from '../config/app.config.js';

const generatePassword = async (password) => {
  bcrypt.hash(password, config.saltRounds).then((err, hash) => {
    return hash;
  });
}

const checkPasswords = async (dbPass, userPass) => {
  bcrypt.hash(userPass, config.saltRounds).then((err, hash) => {
    return dbPass == hash;
  });
}

module.exports = {
  generatePassword,
  checkPasswords
}