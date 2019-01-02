'use strict'

import logger from './logger.module.js';
import db from './db.module.js';

const activate = async code => {
  const record = await db.getUser('activation_code', code);
  if(record.success && record.user) {
    return db.doUpdate(record.user.uuid, {
      activated: true,
      activated_at: new Date().getTime()
    });
  }
  else {
    return { success: false, error: { code: 300, message: logger.getErrorMessage(300) } };
  }
}

module.exports = { activate }
