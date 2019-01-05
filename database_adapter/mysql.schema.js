'use strict'

import utils from '../lib/utils.mysql.js';

const users = () => {
    let str            = "";
    const fields       = utils.getDefaultFields();
    const customFields = utils.generateCustomFields();

    const allFields = fields.concat(customFields);
    allFields.push("PRIMARY KEY (uuid)");

    str += "CREATE TABLE IF NOT EXISTS users (";
    str += allFields.join(', ');
    str += ")"
    return str;
}

module.exports = {
    users
};
