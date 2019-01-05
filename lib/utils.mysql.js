'use strict'

import config from '../config/mysql.config';
import utils from './utils';

const allowedFieldTypes = [
  'TINYINT', 'SMALLINT', 'MEDIUMINT', 'INT', 'BIGINT',
  'DECIMAL', 'FLOAT', 'DOUBLE', 'BIT',
  'CHAR(128)', 'VARCHAR(255)', 'BINARY', 'VARBINARY',
  'TINYBLOB', 'BLOB', 'MEDIUMBLOB', 'LONGBLOB',
  'TINYTEXT', 'TEXT', 'MEDIUMTEXT', 'LONGTEXT',
  'ENUM', 'SET',
  'DATE', 'TIME', 'DATETIME', 'TIMESTAMP', 'YEAR'
];
const fieldNameRegex = /^[a-zA-Z_][a-zA-Z0-9_]*$/;
// const intCheckRegex = /(\b(TINY|SMALL|MEDIUM|BIG|)(INT)\b)/;
// const charCheckRegex;
// const blobCheckRegex;


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
  "password_reset_at TIMESTAMP DEFAULT NULL",
  "password_changed_at TIMESTAMP DEFAULT NULL",
  "created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP",
  "updated_at TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP"
];

// const typeChecker = (fieldType) => {
//   switch(fieldType) {
//     case intCheckRegex.test(fieldType):
//       // Validate INT types
//     // case
//   }
// }

const getDefaultFields = () => {
  return defaultFields;
}

const validateCustomFieldQuery = (field) => {
  if(fieldNameRegex.test(field.field_name) && allowedFieldTypes.indexOf(field.type) >= 0){
    return true;
  }
  else { return false; }
}

const generateCustomFields = () => {
  const customFields = [];
  if(config.tbl_mysql_users && config.tbl_mysql_users.length > 0) {
    config.tbl_mysql_users.forEach((field) => {
      if (field.field_name && field.type) {
        const f1 = validateCustomFieldQuery(field);
        if (f1) {
          customFields.push([utils.toSnakeCase(field.field_name), field.type].join(' '));
        }
      }
    });

    if(config.tbl_mysql_users.length != customFields.length) {
      // Errors in custom fields
      console.error("some custom fields are not imported");
    }
  }

  return customFields;
}

module.exports = {
  getDefaultFields,
  generateCustomFields
};
