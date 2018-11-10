
import model from '../../models/mysql.model.js';

/**
 * @namespace config {object}
 */
const config = {
  host:     '0.0.0.0',
  port:     '3306',
  user:     'root',
  password: '',
  database: 'micro_auth_dev',
  pool:     '10'
};

describe('Test MySQL Model', () => {

  test('Initialise database with wrong params should fail', async (done) => {
    config.port = '3432';
    const res = await model.init(config);

    expect(res).toBe(false);

    done()
  });

  test('Init database should succeed', async (done) => {
    config.port = '3306';
    const res = await model.init(config);

    expect(res).toBe(true);

    done()
  });

});