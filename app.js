
const express    = require('express');
const bodyParser = require('body-parser');
const app        = express();

import apiV1 from './api/v1'

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => res.send('Hello World!'));

// CREATE NEW USER
app.post('/register', apiV1.register);

// UPDATE USER PARAMETERS
// app.post('/user/:id', apiV1.update);

// ACTIVATE USER VIA EMAIL CONFIRMATION
// app.post('/activate', apiV1.activate);

// LOGIN
// app.post('/login, apiV1.login);

// CHECK AUTHENTICATION
// app.post('/authenticate', apiV1.authenticate);

// LOGOUT
// app.post('/logout', apiV1.logout);

// FORGOT PASSWORD - REQUEST RESET, WILL RETURN RESET-CODE
// app.post('/forgot', apiV1.forgot);

// RESET PASSWORD VIA RESET-CODE WITHOUT PROVIDING CURRENT PASSWORD
// app.post('/reset', apiV1.reset);

module.exports = app;

