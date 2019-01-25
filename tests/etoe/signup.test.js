'use strict'

const request = require('supertest');
const app = require('../../app');

describe('Signup process', () => {

  // beforeAll(async() => {
  //   return;
  // });

  afterAll(() => {
    setTimeout(() => { process.exit() }, 1000);
  });

  test('Register New User', async done => {
    const params = { firstname: 'Saravana', email: 'saravana.e-to-e@gmail.com', password: 'password' };

    request(app)
      .post('/register')
      .set('Content-type', 'application/json')
      .set('Accept', 'application/json')
      .send(params)
      .expect(200)
      .then(response => {
        console.log("Response : ", response);
        done();
      })
      .catch(err => {
        console.log("Error : ", err);
        done();
      });
    // expect(response.text).toBe('Hello World!');
  });

  // test('Activate registration', () => {});

  // test('Forgot password', () => {});

  // test('Reset Password', () => {});

});
