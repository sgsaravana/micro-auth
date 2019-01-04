'use strict'

import utils from '../../lib/utils.mysql';
import config from '../../config/mysql.config';

describe('Test MySQL utils functions', () => {

  beforeAll(() => {
    config.tbl_mysql_users = [
      { field_name: 'usernameOne', type: 'VARCHAR(255)' },
      { field_name: 'usernameTwo', type: 'UNKNOWN' }
    ]
  })

  test('Generate custom fields should avoid wrong fields', () => {
    const fields = utils.generateCustomFields();
    expect(fields).not.toBe(undefined);
    expect(fields.length).toBe(1);
  });

});
