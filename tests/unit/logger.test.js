'use strict'

import logger from '../../modules/logger.module.js';

describe('Logger module', () => {

  test('prints error message for error code', () => {
    const m1 = logger.getErrorMessage(200);
    expect(m1).toBe("Firstname is mandatory");

    const m2 = logger.getErrorMessage(210);
    expect(m2).toBe("Invalid Email address");

    const m3 = logger.getErrorMessage(235245245);
    expect(m3).toBe("Unknown error!");
  });

})