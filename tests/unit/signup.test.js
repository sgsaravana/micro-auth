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

    test('validates email', async (done) => {
      const params1 = { firstname: 'Saravana', email: 'wrongemail@fake', password: 'password' }
      const response1 = await signup.register(params1);

      expect(response1.success).toBe(false);
      expect(response1.error.code).toBe(210);
      expect(response1.error.message).toBe("Invalid Email address");

      done();
    });

    test('Register User will return user id', async () => {
      // Register a new user with given parameters
      const params = { firstname: 'Saravana', email: 'sgsaravana@gmail.com', password: 'password' };
      const result = await signup.register(params);

      expect(result.success).toBe(true);
      expect(result.user.id).not.toBe(null);
    });

    test('Registered user will be inactive', async () => {
      const params = { firstname: 'Saravana', email: 'sgsaravana@gmail.com', password: 'password' };
      const result = await signup.register(params);

      expect(result.success).toBe(true);
      expect(result.user.isActivated).toBe(false);
    });

    test('Registering user will return a uuid as confirmation string for activation', async () => {
      const params = { firstname: 'Saravana', email: 'sgsaravana@gmail.com', password: 'password' };
      const result = await signup.register(params);

      expect(result.success).toBe(true);
      expect(result.user.activationCode.length).toBeGreaterThan(0);
      expect(typeof result.user.activationCode).toBe(typeof 'string');
    })
  })


  describe('Activate Registrations', () => {

    test('Activating user with wrong code should fail', async () => {
      const params = { firstname: 'Saravana', email: 'sgsaravana@gmail.com', password: 'password' };
      const result = await signup.register(params);

      const actResult = await signup.activate('wrong-code');
      expect(actResult).not.toBe(undefined);
      expect(actResult.success).toBe(false);
    });

    test('Activeting user with correct code should succeed', async () => {
      const params = { firstname: 'Saravana', email: 'sgsaravana@gmail.com', password: 'password' };
      const result = await signup.register(params);
      const activationCode = result.user.activationCode;

      const actResult = await signup.activate(activationCode);
      expect(actResult.success).toBe(true);
    });

  });

  describe('Forgot Password', () => {

    test('forgot password function should return reset code', async () => {});
    test('change password with wrong reset code should fail', async () => {});
    test('change password with correct reset code should succeed', async () => {});

  });

});
