
const uuidv1 = require('uuid/v1');
import model from '../../models/mysql.model.js';
import adapter from '../../database_adapter/mysql.adapter';

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

const sampleData = [
  {
    firstname: 'Steve',
    lastname: 'Jobs',
    email: 'steve@apple.com',
    password: 'macintosh'
  },
  {
    firstname: 'Jason',
    lastname: 'Statham',
    email: 'jstatham@gmail.com',
    password: 'killhobbs'
  },
  {
    firstname: 'Dwayne',
    lastname: 'Johnson',
    email: 'therock@gmail.com',
    password: 'ifyousmellwhattherockiscooking'
  }
]

const registerParams = {
  firstname: 'Saravana',
  lastname: 'B',
  email: 'sgsaravana@gmail.com',
  password: 'password'
};

describe('Test MySQL Connection', () => {

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

    done();
  });

});

describe('Test MySQL Model Functions', () => {

  beforeAll(async done => {
    config.port = '3306';
    const pool = await adapter.init(config);
    pool.database.query("DELETE FROM users", (err, result) => {
      console.log('err, result at delete all users');
      console.log(err, result);
      done();
    });
  });

  beforeAll(async done => {
    config.port = '3306';
    const res = await model.init(config);
    expect(res).toBe(true);

    sampleData.forEach(async data => {
      data.uuid = uuidv1();
      await model.register(data);
    });

    done();
  });

  test('register new user should return success', async done => {
    registerParams.uuid = uuidv1();
    const result = await model.register(registerParams);

    expect(result).not.toBe(undefined);
    expect(result.success).toBe(true);

    expect(result.user).not.toBe(undefined);
    expect(result.user.uuid).toEqual(registerParams.uuid);

    done();
  });

  test('register existing email should fail', async done => {
    const params = {
      firstname: 'Duplicate user',
      email: 'dupemail@gmail.com',
      password: 'somethingtemporary',
      uuid: uuidv1()
    };
    const result1 = await model.register(params);
    expect(result1).not.toBe(undefined);
    expect(result1.success).toBe(true);

    params.uuid = uuidv1();
    params.firstname = 'New Duplicate';

    const result2 = await model.register(params);

    expect(result2).not.toBe(undefined);
    expect(result2.success).toBe(false);
    done();
  });

  test('update user should update user particulars in table', async done => {
    const uuid = uuidv1();
    const user = {
      firstname: 'Denzil',
      lastname: 'Washington',
      email: 'dwashington@gmail.com',
      password: 'noidea',
      uuid: uuid
    };

    const result1 = await model.register(user);
    expect(result1).not.toBe(undefined);
    expect(result1.success).toBe(true);

    const updateUser = {lastname: 'W'};

    const result2 = await model.update(uuid, updateUser);
    expect(result2).not.toBe(undefined);
    expect(result2.success).toBe(true);
    expect(result2.user.firstname).toBe(user.firstname);
    expect(result2.user.lastname).toBe('W');

    done();
  });

  test('activate user should mark activation to true', async done => {
    done();
  });

  test('update password with wrong current password should fail', async done => {
    done();
  });

  test('check authentication should check for credentials', async done => {
    done();
  });

  test('check wrong credentials should return false', async done => {
    done();
  });

});