'use strict'

const uuidv4 = require('uuid/v4');

import db from './db.module';
import logger from './logger.module';

const generateResetCode = async () => {
  return uuidv4();
}

const requestCode = async (email) => {
  const record = await db.getUser('email', email);
  if (record.success && record.user) {
    const resetCode = await generateResetCode();
    const result = await db.update(record.user.uuid, {
      reset_code: resetCode,
      reset_code_generated_at: new Date().getTime()
    });
    return result;
  }
  else {
    return { success: false, error: { code: 320, message: logger.getErrorMessage(320) } };
  }
};

module.exports = {
  requestCode
}
