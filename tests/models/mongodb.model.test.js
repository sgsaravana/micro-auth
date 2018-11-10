'use strict'

import model from '../../models/mongodb.model.js';

/**
 * @namespace config {object}
 */
const config = {
  url:    'mongodb://0.0.0.0:32775',
  dbName: 'micro_auth_dev',
}

describe('Test Mongodb Model', () => {

  test('Initialise database with wrong params should fail', async (done) => {
    config.url = 'mongodb://0.0.0.0:3277';
    const res = await model.init(config);

    expect(res).toBe(false);

    done()
  });

  test('Init database should succeed', async (done) => {
    config.url = 'mongodb://0.0.0.0:32775';
    const res = await model.init(config);

    expect(res).toBe(true);

    done()
  });

})