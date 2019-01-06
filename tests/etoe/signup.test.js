'use strict'

const request = require('supertest');
const app = require('../../app');

describe('Signup process', () => {

  // beforeAll(async() => {
  //   return;
  // });

  // afterAll(() => {
  //   setTimeout(() => { process.exit() }, 1000);
  // });

  test('Register New User', async done => {
    const response = await request(app).get('/');
    expect(response.text).toBe('Hello World!');
    done();
  });

  // test('Activate registration', () => {});

  // test('Forgot password', () => {});

  // test('Reset Password', () => {});

});
