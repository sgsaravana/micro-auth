'use strict'

import config from '../config/mongo.config';
import utils from './utils';

const fieldNameRegex = /^[a-zA-Z_][a-zA-Z0-9_]*$/;

const defaultFields = {
  uuid: { type: String, required: true },
  firstname: { type: String, required: true },
  lastname: String,
  email: { type: String, required: true },
  password: String,
  description: String,
  activated: Boolean,
  activatedAt: Date,
  activationCode: String,
  activationCodeGeneratedAt: Date,
  resetCode: String,
  resetCodeGeneratedAt: Date,
  passwordResetAt: Date,
  passwordChangedAt: Date,
  createdAt: { type: Date, required: true },
  updatedAt: { type: Date, default: Date.now },
};

const getDefaultFields = () => {
  return defaultFields;
}

const validateCustomFieldQuery = (field) => {
  return fieldNameRegex.text(field.field_name);
}

const generateCustomFields = () => {
  const customFields = {};
  if(config.tbl_mongodb_users && config.tbl_mongodb_users.length > 0) {
    for( field in config.tbl_mongodb_users ) {
      const f1 = validateCustomFieldQuery(field);
      if(f1){
        customFields[utils.toCamelCase(field)] = config.tbl_mongodb_users[field];
      }
    }
  }
}

module.exports = {
  getDefaultFields,
  generateCustomFields
};
