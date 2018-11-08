
const express = require('express');
const app = express();
const port = process.env.PORT || 11456;
const env = process.env.NODE_ENV || 'development';

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`App listening at ${env} on port ${port}`));
