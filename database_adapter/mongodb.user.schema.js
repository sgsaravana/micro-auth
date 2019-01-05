'use strict'

import mongoose from 'mongoose';
import utils from '../lib/utils.mongodb.js';

const users = () => {
  const fields       = utils.getDefaultFields();
  const customFields = utils.generateCustomFields();

  const allFields = Object.assign(fields, customFields);
  const users = new mongoose.Schema(allFields);
  return users;
}

module.exports = mongoose.model('User', users());
