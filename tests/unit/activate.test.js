'use strict'

import activation from '../../modules/activation.module.js';
import db from '../../modules/db.module.js';

describe('Activate module test', () => {

  beforeAll(async () => {
    db.getUser = jest.fn().mockImplementation(async (key, code) => {
      if(key == 'activation_code' && code == 'wrong-code') {
        return { success: false }
      }
      else {
        return { success: true, user: {} }
      }
    });
    db.doUpdate = jest.fn().mockImplementation(async (uuid, params) => {
      params.uuid = uuid
      return {success: true, user: params}
    });
  });

  describe('Activate Registrations', () => {

    test('Activating user with wrong code should fail', async () => {
      const actResult = await activation.activate('wrong-code');
      expect(actResult).not.toBe(undefined);
      expect(actResult.success).toBe(false);
    });

    test('Activeting user with correct code should succeed', async () => {
      const actResult = await activation.activate('activationCode');
      expect(actResult).not.toBe(undefined);
      expect(actResult.success).toBe(true);
    });

  });


});
