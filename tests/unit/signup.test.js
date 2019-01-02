'use strict'

import signup from '../../modules/signup.module.js';
import db from '../../modules/db.module.js';
// const db = jest.genMockFromModule('../../modules/db.module.js');

describe('Signup modules unit test', () => {

  beforeEach(() => {
    db.init       = jest.fn().mockImplementation(async () => { return true; });
    db.doRegister = jest.fn().mockImplementation(async (params) => {
      params.id = Math.floor(Math.random() * Math.floor(10000000));
      return {success: true, user: params};
    });
    db.getUser = jest.fn().mockImplementation(async (key, value) => {
      if(key == "email"){
        if(value == "duplicateemail@gmail.com"){
          return { success: true, user: {} };
        }
        else if (value == "anotherduplicateemail@gmail.com"){
          return { success: false };
        }
        else {
          return { success: true };
        }
      }
    });
    db.doActivate = jest.fn().mockImplementation(async code => {
      if(code == 'wrong-code') {
        return {success: false}
      }
      else {
        return {success: true}
      }
    })
  });

  describe('Register User', () => {

    test('validates all required parameters', async (done) => {
      const params1 = {};
      const response1 = await signup.register(params1);

      expect(response1.success).toBe(false);
      expect(response1.error.code).toBe(200);
      expect(response1.error.message).toBe("Firstname is mandatory");

      const params2 = { firstname: 'Saravana', lastname: 'B' };
      const response2 = await signup.register(params2);

      expect(response2.success).toBe(false);
      expect(response2.error.code).toBe(202);
      expect(response2.error.message).toBe("Email is mandatory");

      const params3 = { firstname: 'Saravana', lastname: 'B', email: "" };
      const response3 = await signup.register(params3);

      expect(response3.success).toBe(false);
      expect(response3.error.code).toBe(202);
      expect(response3.error.message).toBe("Email is mandatory");

      const params4 = { firstname: 'Saravana', lastname: 'B', email: "sgsaravana@gmail.com" };
      const response4 = await signup.register(params4);

      expect(response4.success).toBe(false);
      expect(response4.error.code).toBe(203);
      expect(response4.error.message).toBe("Password is mandatory");

      done()
    });

    test('validates email', async done => {
      const params1 = { firstname: 'Saravana', email: 'wrongemail@fake', password: 'password' }
      const response1 = await signup.register(params1);

      expect(response1.success).toBe(false);
      expect(response1.error.code).toBe(210);
      expect(response1.error.message).toBe("Invalid Email address");

      done();
    });

    test('Registering user with existing email should return error', async done => {
      // Register a new user with existing email address
      const params = { firstname: 'Saravana', email: 'duplicateemail@gmail.com', password: 'password' };
      const result = await signup.register(params);

      expect(result.success).toBe(false);
      expect(result.error.code).toBe(211);
      done();
    });

    test('Email check error when registering should return code 322 error', async done => {
      // Register a new user with existing email address
      const params = { firstname: 'Saravana', email: 'anotherduplicateemail@gmail.com', password: 'password' };
      const result = await signup.register(params);

      expect(result.success).toBe(false);
      expect(result.error.code).toBe(322);
      done();
    });

    test('Register User will return user id and activation code', async done => {
      // Register a new user with given parameters
      const params = { firstname: 'Saravana', email: 'saravana1@gmail.com', password: 'password' };
      const result = await signup.register(params);

      expect(result.success).toBe(true);
      expect(result.user.id).not.toBe(null);
      expect(result.user.activationCode).not.toBe(null);
      done();
    });

    test('Registered user will be inactive', async done => {
      const params = { firstname: 'Saravana', email: 'sgravana@gmail.com', password: 'password' };
      const result = await signup.register(params);

      expect(result.success).toBe(true);
      expect(result.user.isActivated).toBe(false);
      done();
    });

    test('Registering user will return a uuid as confirmation string for activation', async done => {
      const params = { firstname: 'Saravana', email: 'saravana@gmail.com', password: 'password' };
      const result = await signup.register(params);

      expect(result.success).toBe(true);
      expect(result.user.activationCode.length).toBeGreaterThan(0);
      expect(typeof result.user.activationCode).toBe(typeof 'string');
      done();
    });
  });

  // describe('Forgot Password', () => {

  //   test('forgot password function should return reset code', async () => {});
  //   test('change password with wrong reset code should fail', async () => {});
  //   test('change password with correct reset code should succeed', async () => {});

  // });

});
