
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
    password: 'm@c!nt0sh',
    activationCode: '36435634632523465'
  },
  {
    firstname: 'Jason',
    lastname: 'Statham',
    email: 'jstatham@gmail.com',
    password: 'KillHobbs',
    activationCode: 'uyrgbiqv364trbiq6w48'
  },
  {
    firstname: 'Dwayne',
    lastname: 'Johnson',
    email: 'therock@gmail.com',
    password: 'IfYouSmellWhatTheRockIsCooking',
    activationCode: 'cds87aftbi6sbfiasybdgauys'
  }
]

const registerParams = {
  firstname: 'Saravana',
  lastname: 'B',
  email: 'sgsaravana@gmail.com',
  password: 'password',
  activationCode: 'vis7a6tfbaw8biauygfiauy'
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
      await model.create(data);
    });

    done();
  });

  test('register new user should return success', async done => {
    registerParams.uuid = uuidv1();
    const result = await model.create(registerParams);

    expect(result).not.toBe(undefined);
    expect(result.success).toBe(true);

    expect(result.user).not.toBe(undefined);
    expect(result.user.uuid).toEqual(registerParams.uuid);

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

    const result1 = await model.create(user);
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

  test('Get user by different keys should return the right record', async done => {
    const uuid = uuidv1();
    const user = {
      firstname: 'Dominic',
      lastname: 'Toretto',
      email: 'dtoretto@gmail.com',
      password: 'speedkills',
      activation_code: uuidv1(),
      uuid: uuid
    };

    const result = await model.create(user);
    expect(result).not.toBe(undefined);
    expect(result.success).toBe(true);

    const res1 = await model.getUserByKey('uuid', uuid);
    expect(res1).not.toBe(undefined);
    expect(res1.success).toBe(true);
    expect(res1.user.email).toBe(user.email);

    done();
  });

});