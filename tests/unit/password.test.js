'use strict'

import pass from '../../modules/password.module';

describe('Auth Module tests', () => {

  test('should create a password hash', async done => {
    const passwd = "testpassword";
    const hash = await pass.generatePassword(passwd);
    expect(hash).not.toBe(undefined);
    expect(hash).not.toBe(passwd);
    done();
  });

  test('should compare passwords and return true if correct', async done => {
    const passwd = "testpasswordfirst";
    const checkpasswd = "secondpasswordtest";
    const hash = await pass.generatePassword(passwd);
    expect(hash).not.toBe(undefined);
    expect(hash).not.toBe(passwd);

    const check1 = await pass.checkPasswords(hash, passwd);
    const check2 = await pass.checkPasswords(hash, checkpasswd);

    expect(check1).not.toBe(undefined);
    expect(check1).not.toBe(false);
    expect(check2).not.toBe(undefined);
    expect(check2).not.toBe(true);
    done();
  });

});
