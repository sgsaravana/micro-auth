
const express = require('express');
const app = express();
const port = 11456;
const env = process.env.NODE_ENV

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`App listening at ${env} on port ${port}`));
