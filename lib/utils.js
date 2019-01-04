'use strict'

const toSnakeCase = (str) => {
  return str.replace(/([A-Z])/g, (s) => {
    return "_"+s.toLowerCase();
  });
}

const toCamelCase = (str) => {
  return str.replace(/(\_[a-z])/g, (s) => {
    return s.toUpperCase().replace('_','');
  });
}

module.exports = {
    toSnakeCase,
    toCamelCase
}
