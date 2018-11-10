
const express = require('express');
const app = express();
const port = process.env.PORT || 11456;
const env = process.env.NODE_ENV || 'development';

app.get('/', (req, res) => res.send('Hello World!'));

// CREATE NEW USER
// app.post('/register', apiV1.register);

// UPDATE USER PARAMETERS
// app.post('/user/:id', apiV1.update);

// ACTIVATE USER VIA EMAIL CONFIRMATION
// app.post('/activate', apiV1.activate);

// FORGOT PASSWORD - REQUEST RESET, WILL RETURN RESET-CODE
// app.post('/forgot', apiV1.forgot);

// RESET PASSWORD VIA RESET-CODE WITHOUT PROVIDING CURRENT PASSWORD
// app.post('/reset', apiV1.reset);

app.listen(port, () => {
  console.log(`App listening at ${env} on port ${port}`)
});
