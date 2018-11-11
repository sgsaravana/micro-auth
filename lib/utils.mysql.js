'use strict'

import config from './config.js';

const allowedFieldTypes = [
  'TINYINT', 'SMALLINT', 'MEDIUMINT', 'INT', 'BIGINT',
  'DECIMAL', 'FLOAT', 'DOUBLE', 'BIT',
  'CHAR', 'VARCHAR', 'BINARY', 'VARBINARY',
  'TINYBLOB', 'BLOB', 'MEDIUMBLOB', 'LONGBLOB',
  'TINYTEXT', 'TEXT', 'MEDIUMTEXT', 'LONGTEXT',
  'ENUM', 'SET',
  'DATE', 'TIME', 'DATETIME', 'TIMESTAMP', 'YEAR'
];
const fieldNameRegex = /^[a-zA-Z_][a-zA-Z0-9_]*$/;

const defaultFields = [
  "uuid VARCHAR(255) NOT NULL",
  "firstname VARCHAR(255) NOT NULL",
  "lastname VARCHAR(255)",
  "email VARCHAR(255) NOT NULL",
  "password VARCHAR(255)",
  "description TEXT",
  "activated TINYINT",
  "activated_at TIMESTAMP NULL DEFAULT NULL",
  "activation_code VARCHAR(255)",
  "activation_code_generated_at TIMESTAMP NULL DEFAULT NULL",
  "reset_code VARCHAR(255) NULL DEFAULT NULL",
  "reset_code_generated_at TIMESTAMP NULL DEFAULT NULL",
  "created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP",
  "updated_at TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP"
];

const getDefaultFields = () => {
  return defaultFields;
}

const generateCreateTableFieldQuery = (field) => {
  if(fieldNameRegex.test(field.field_name) && allowedFieldTypes.indexOf(field.tye) >= 0){
    // return true
    return
  }
}

const generateCustomFields = () => {
  if(config.tbl_mysql_users && config.tbl_mysql_users.length) {
    config.tbl_mysql_users.forEach((field) => {
      const f1 = generateCreateTableFieldQuery(field);
      if (f1) { customFields.push(f1); }
    });

    if(config.tbl_mysql_users.length != customFields.length) {
      // Errors in custom fields
    }
  }
}

module.exports = {
  getDefaultFields,
  generateCustomFields
};
