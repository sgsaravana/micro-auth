'use strict'

const signup = require('../../modules/signup.module.js');
const logger = require('../../modules/logger.module.js');

describe('Signup modules unit test', () => {

  beforeEach(() => {});

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
