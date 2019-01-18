'use strict'

const uuidv1 = require('uuid/v1');

import model from '../../models/mongodb.model.js';
import adapter from '../../database_adapter/mongodb.adapter';

/**
 * @namespace config {object}
 */
const config = {
  url:    'mongodb://0.0.0.0:27017',
  dbName: 'micro_auth_dev',
}

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

describe('Test Mongodb Model', () => {

  test('Initialise database with wrong params should fail', async (done) => {
    config.url = 'mongodb://0.0.0.0:3277';
    const res = await model.init(config);

    expect(res).toBe(false);

    done()
  });

  test('Init database should succeed', async (done) => {
    config.url = 'mongodb://0.0.0.0:27017';
    const res = await model.init(config);

    expect(res).toBe(true);

    done()
  });

});

describe('MongoDB Model Functions', () => {

  beforeAll(async done => {
    config.url = 'mongodb://0.0.0.0:27017';
    const db = await adapter.init(config);
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

