'use strict'

const bcrypt = require('bcrypt');

import config from '../config/app.config.js';

const generatePassword = async (password) => {
  return new Promise(resolve => {
    bcrypt.hash(password, config.saltRounds).then(resolve);
  });
}

const checkPasswords = async (dbPass, userPass) => {
  return new Promise(resolve => {
    bcrypt.compare(userPass, dbPass).then(resolve);
  });
}

module.exports = {
  generatePassword,
  checkPasswords
}