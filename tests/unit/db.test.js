'use strict'

import db from '../../modules/db.module.js';
// let db;
const model = require('../../database_adapter/mysql.connect.js');

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

  // test('Load mongodb conf', async done => {
  //   done();
  // });

});
