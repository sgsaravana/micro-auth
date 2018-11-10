'use strict'

import signup from '../../modules/signup.module.js';
import db from '../../modules/db.module.js';
// const db = jest.genMockFromModule('../../modules/db.module.js');

describe('Signup modules unit test', () => {

  beforeEach(() => {
    db.doRegister = jest.fn().mockImplementation(async (params) => {
      params.id = Math.floor(Math.random() * Math.floor(10000000));
      return {success: true, user: params};
    });
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

      done()
    });

    test('validates email', async (done) => {
      const params1 = { firstname: 'Saravana', email: 'wrongemail@fake' }
      const response1 = await signup.register(params1);

      expect(response1.success).toBe(false);
      expect(response1.error.code).toBe(210);
      expect(response1.error.message).toBe("Invalid Email address");

      done();
    });

    test('Register User will return user id', async () => {
      // Register a new user with given parameters
      const params = { firstname: 'Saravana', email: 'sgsaravana@gmail.com' };
      const result = await signup.register(params);

      expect(result.success).toBe(true);
      expect(result.user.id).not.toBe(null);
    });

    test('Registered user will be inactive', async () => {
      const params = { firstname: 'Saravana', email: 'sgsaravana@gmail.com' };
      const result = await signup.register(params);

      expect(result.success).toBe(true);
      expect(result.user.isActivated).toBe(false);
    });

    test('Registering user will return a uuid as confirmation string for activation', async () => {
      const params = { firstname: 'Saravana', email: 'sgsaravana@gmail.com' };
      const result = await signup.register(params);

      expect(result.success).toBe(true);
      expect(result.user.activationCode.length).toBeGreaterThan(0);
      expect(typeof result.user.activationCode).toBe(typeof 'string');
    })
  })


  test('Activate Registrations', () => {});

  test('Forgot Password', () => {});

  test('Reset Password', () => {});

});
