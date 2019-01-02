'use strict'

import db from '../../modules/db.module.js';
const uuidv1 = require('uuid/v1');
const model = require('../../models/mysql.model.js');

const registerParams = {
  firstname: 'Saravana',
  lastname: 'B',
  email: 'sgsaravana@gmail.com'
};

describe('Test Database module', () => {

  describe('Test failure case', () => {
    test('doRegister should fail with status code 100 if database init fails', async done => {
      model.init = jest.fn().mockImplementation(async () => { return false; });

      const res = await db.doRegister(registerParams);
      // console.log('res: ', res);
      expect(res).not.toBe(undefined);
      expect(res.success).toBe(false);
      expect(res.error.code).toBe(100);

      done();
    });
  });

  describe('Test after DB Init success', () => {
    beforeAll(() => {
      // Mock model.init() and db.init() function to avoid connecting to databases
      model.init = jest.fn().mockImplementation(async () => { return true; });
      model.create = jest.fn().mockImplementation(async (params) => {
        params.id   = Math.floor(Math.random() * Math.floor(10000000));
        params.uuid = uuidv1();
        return { success: true, user: params };
      });

      model.getUserByKey = jest.fn().mockImplementation(async (key, val) => {
        if(key == 'uuid'){
          if(val == 'wrong-uuid') {
            return { success: false }
          }
          else {
            return { success: true, user: {uuid: val} }
          }
        }
      });

      model.update = jest.fn().mockImplementation(async (uuid, data) => {
        data.uuid = uuid;
        return { success: true, user: data }
      });
    });

    test('Get User should return the user record', async done => {
      const res1 = await db.getUser('uuid', 'somecorrectuuid')
      expect(res1).not.toBe(undefined);
      expect(res1.success).toBe(true);
      done();
    });

    test('Get user with non-existing UUID should return error', async done => {
      const res = await db.getUser('uuid', 'wrong-uuid');
      expect(res).not.toBe(undefined);
      expect(res.success).toBe(false);
      expect(res.error.code).toBe(320);
      done();
    });

    test('doRegister should register user to the database', async done => {

      const res = await db.doRegister(registerParams);
      expect(res).not.toBe(undefined);
      expect(res.success).toBe(true);
      expect(res.user.id).not.toBe(undefined);
      expect(res.user.uuid).not.toBe(undefined);
      expect(res.user.firstname).toBe(registerParams.firstname);

      done();
    });

    test('doUpdate should update existing user record', async done => {
      const res = await db.doRegister(registerParams);
      const user = res.user;

      const result = await db.doUpdate(user.uuid, { lastname: 'Balaraj' });
      expect(result).not.toBe(undefined);
      expect(result.success).toBe(true);
      expect(result.user.lastname).toBe('Balaraj');
      done();
    });

    test('Update user with wrong UUID should fail', async done => {
      const res = await db.doRegister(registerParams);

      const result = await db.doUpdate('wrong-uuid', { lastname: 'Balaraj' });
      expect(result).not.toBe(undefined);
      expect(result.success).toBe(false);
      expect(result.error.code).toBe(320);
      done();
    });
  });

});
