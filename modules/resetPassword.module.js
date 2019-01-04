'use strict'

import db from './db.module';
import logger from './logger.module';
import passwd from './password.module';

const changePassword = async (resetCode, newPassword) => {
  const record = await db.getUser('reset_code', resetCode);
  if(record.success && record.user) {
    const password = await passwd.generatePassword(newPassword);
    const result = db.update(record.user.uuid, {
      password: password,
      password_reset_at: new Date().getTime()
    });
    return result;
  }
  else {
    return { success: false, error: { code: 355, message: logger.getErrorMessage(355) } };
  }
}

module.exports = {
  changePassword
}
