'use strict'

import auth from '../../modules/authentication.module';
import config from '../../config/app.config';
import pass from '../../modules/password.module';
import db from '../../modules/db.module.js';

describe('Authentication Test', () => {

  const user = {
    email:     'microservice@gmail.com',
    password:  'isasecretstring'
  };

  beforeEach(() => {
    db.init = jest.fn().mockImplementation(async () => { return true; });
    db.getUser = jest.fn().mockImplementation(async (key, value) => {
      const res = {
        email: user.email,
        password: await pass.generatePassword(user.password)
      }
      if(value == user.email) {
        return { success: true, user: res }
      }
      else {
        return { success: false }
      }
    });
  });

  test('Login with email and password should return JWT token', async done => {
    const res = await auth.authenticate(user);
    expect(res).not.toBe(undefined);
    expect(res.success).toBe(true);
    expect(res.token).not.toBe(undefined);
    done();
  });

  test('Generate token with secret', async done => {
    config.jwtSignMethod = 'secret';
    const res = await auth.authenticate(user);
    expect(res).not.toBe(undefined);
    expect(res.success).toBe(true);
    expect(res.token).not.toBe(undefined);
    done();
  })

  test('Generate token with privatekey', async done => {
    config.jwtSignMethod = 'privatekey';
    const res = await auth.authenticate(user);
    expect(res).not.toBe(undefined);
    expect(res.success).toBe(true);
    expect(res.token).not.toBe(undefined);
    done();
  });

  test('Generate token should fail if configuration is wrong', async done => {
    config.jwtSignMethod = 'privatekey1';
    const res = await auth.authenticate(user);
    expect(res).not.toBe(undefined);
    expect(res.success).toBe(false);
    done();
  });

  test('Login with wrong credentials should return error', async done => {
    const res1 = await auth.authenticate({
      email: user.email,
      password: 'sorrywrongpassword'
    });
    expect(res1).not.toBe(undefined);
    expect(res1.success).toBe(false);
    expect(res1.error.code).toBe(352);
    expect(res1.token).toBe(undefined);

    const res2 = await auth.authenticate({
      email: 'wrongemail',
      password: user.password
    });
    expect(res2).not.toBe(undefined);
    expect(res2.success).toBe(false);
    expect(res2.error.code).toBe(351);
    expect(res2.token).toBe(undefined);
    done();
  });

  test('Verify correct token with secret should return true', async done => {
    config.jwtSignMethod = 'secret';
    const res = await auth.authenticate(user);
    expect(res).not.toBe(undefined);
    expect(res.success).toBe(true);
    const token = res.token;

    const result = await auth.verify(token);
    // console.log('result: ', result);
    expect(result).not.toBe(undefined);
    expect(result.success).toBe(true);
    expect(result.decoded).not.toBe(undefined);
    done();
  });

  test('Verify correct token with privatekey should return true', async done => {
    config.jwtSignMethod = 'privatekey';
    const res = await auth.authenticate(user);
    expect(res).not.toBe(undefined);
    expect(res.success).toBe(true);
    const token = res.token;

    const result = await auth.verify(token);
    console.log('result: ', result);
    expect(result).not.toBe(undefined);
    expect(result.success).toBe(true);
    expect(result.decoded).not.toBe(undefined);
    done();
  });

  test('Verify wrong token with secret should fail', async done => {
    config.jwtSignMethod = 'secret';
    const res = await auth.authenticate(user);
    expect(res).not.toBe(undefined);
    expect(res.success).toBe(true);
    const token = res.token;

    const result = await auth.verify(token + 'wrong-token');
    // console.log('result: ', result);
    expect(result).not.toBe(undefined);
    expect(result.success).toBe(false);
    done();
  });

  test('Verify wrong token with privatekey should fail', async done => {
    config.jwtSignMethod = 'privatekey';
    const res = await auth.authenticate(user);
    expect(res).not.toBe(undefined);
    expect(res.success).toBe(true);
    const token = res.token;

    const result = await auth.verify(token + 'wrong-token');
    console.log('result at last: ', result);
    expect(result).not.toBe(undefined);
    expect(result.success).toBe(false);
    done();
  });

  test('Verify token should fail if configuration is wrong', async done => {
    config.jwtSignMethod = 'privatekey1';
    const res = await auth.verify(user);
    expect(res).not.toBe(undefined);
    expect(res.success).toBe(false);
    done();
  });

});
