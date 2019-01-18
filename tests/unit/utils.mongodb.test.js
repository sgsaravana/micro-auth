'use strict'

import utils from '../../lib/utils.mongodb';
import config from '../../config/mongodb.config';

describe('Test MongoDB utils functions', () => {

  beforeAll(() => {
    config.tbl_mongodb_users = {
      usernameOne: String,
      usernameTwo: String
    }
  })

  test('Generate custom fields should avoid wrong fields', () => {
    const fields = utils.generateCustomFields();
    expect(fields).not.toBe(undefined);
    expect(Object.keys(fields).length).toBe(2);
  });

});
