'use strict'

import db from '../../modules/db.module.js';
// let db;
const model = require('../../models/mysql.model.js');

const registerParams = {
  firstname: 'Saravana',
  lastname: 'B',
  email: 'sgsaravana@gmail.com'
};

describe('Test Database module', () => {

  beforeEach(() => {
    // Mock model.init() and db.init() function to avoid connecting to databases
    model.init     = jest.fn().mockImplementation(async () => { return true; });
    model.register = jest.fn().mockImplementation(async (params) => {
      params.id = Math.floor(Math.random() * Math.floor(10000000));
      return { success: true, user: params };
    });

    model.getUserByKey = jest.fn().mockImplementation(async (key, val) => {
      if(key == 'activation_code'){
        if(val == 'correct-code') {
          return { success: true, user: {} }
        }
        else {
          return { success: false }
        }
      }
    });

    model.update = jest.fn().mockImplementation(async (uuid, data) => {
      data.uuid = uuid;
      return { success: true, user: data }
    });
  });


  test('doRegister should fail with status code 100 if database init fails', async done => {
    model.init = jest.fn().mockImplementation(async () => { return false; });

    const res = await db.doRegister(registerParams);

    expect(res).not.toBe(undefined);
    expect(res.success).toBe(false);
    expect(res.error.code).toBe(100);

    done();
  });

  test('doRegister should register user to the database', async done => {

    const res = await db.doRegister(registerParams);

    expect(res).not.toBe(undefined);
    expect(res.success).toBe(true);
    expect(res.user.id).not.toBe(undefined);
    expect(res.user.firstname).toBe(registerParams.firstname);

    done();
  });

  test('doActivate should check for user by activation code', async done => {
    const errRes = await db.doActivate('wrong-code');
    expect(errRes).not.toBe(undefined);
    expect(errRes.success).toBe(false);
    expect(errRes.error.code).toBe(300);

    const res = await db.doActivate('correct-code');
    expect(res).not.toBe(undefined);
    expect(res.success).toBe(true);

    done();
  });

});
