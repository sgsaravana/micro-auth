'use strict'

import db from '../../modules/db.module';
import resetPass from '../../modules/resetPassword.module.js';

describe('Reset password test', () => {

  beforeAll(() => {
    db.init = jest.fn().mockImplementation(async () => { return true; });
    db.getUser = jest.fn().mockImplementation(async (key, value) => {
      if(key == "resetCode"){
        if(value == "CorrectResetCode"){
          return { success: true, user: {} };
        }
        else if (value == "wrongResetCode"){
          return { success: true, user: null };
        }
        else {
          return { success: true };
        }
      }
    });
    db.update = jest.fn().mockImplementation(async (uuid, params) => {
      params.uuid = uuid;
      return { success: true, resetCode: params.reset_code }
    })
  });

  test('reset password with correct reset code should allow change password', async done => {
    const res = await resetPass.changePassword('CorrectResetCode', 'newpassword123');
    expect(res).not.toBe(undefined);
    expect(res.success).toBe(true);
    done();
  });

  test('reset password with wrong code should fail', async done => {
    const res = await resetPass.changePassword('wrongResetCode', 'newpassword123');
    expect(res).not.toBe(undefined);
    expect(res.success).toBe(false);
    expect(res.error.code).toBe(355);
    done();
  });

});