'use strict'

const signup = require('../../modules/signup.module.js');
const logger = require('../../modules/logger.module.js');

describe('Signup modules unit test', () => {

  beforeEach(() => {});

  describe('Register User', () => {

    test('validates all required parameters', async (done) => {
      const params = {};
      const response = await signup.register(params);

      expect(response.success).toBe(false);
      expect(response.error.code).toBe(200);
      expect(response.error.message).toBe("Firstname is mandatory");

      done()
    });

    test('validates email', () => {});

    test('Register User', async () => {
      // Register a new user with given parameters
      // const params = {};
      // const result = await signup.register(params);

      // expect(result.user.id).toBe(true);
    });
  })


  test('Activate Registrations', () => {});

  test('Forgot Password', () => {});

  test('Reset Password', () => {});

});
