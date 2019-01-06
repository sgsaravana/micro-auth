// server.js
const app  = require('./app');
const port = process.env.PORT || 11456;
const env  = process.env.NODE_ENV || 'development';

app.listen(port, () => {
  console.log(`App listening at ${env} on port ${port}`)
});
