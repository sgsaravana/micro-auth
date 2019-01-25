'use strict'

import forgot from '../../modules/forgot.module';
import db from '../../modules/db.module';

describe('Forgot password module', () => {

  beforeAll(() => {
    db.init = jest.fn().mockImplementation(async () => { return true; });
    db.getUser = jest.fn().mockImplementation(async (key, value) => {
      if(key == "email"){
        if(value == "someemailaddress@gmail.com"){
          return { success: true, user: {} };
        }
        else if (value == "wrongemail@gmail.com"){
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

  test('trigger forgot password with email should return reset code', async done => {
    const res = await forgot.requestCode('someemailaddress@gmail.com');
    expect(res).not.toBe(undefined);
    expect(res.success).toBe(true);
    expect(res.resetCode).not.toBe(undefined);
    expect(typeof res.resetCode).toBe('string');
    done();
  });

  test('request forgot password with wrong email should fail', async done => {
    const res = await forgot.requestCode('wrongemail@gmail.com');
    expect(res).not.toBe(undefined);
    expect(res.success).toBe(false);
    expect(res.error.code).toBe(320);
    done();
  });

});
