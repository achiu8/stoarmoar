require('dotenv').config()
const express = require('express');

const auth = require('./middlewares/auth');
const api = require('./routes/index');

const app = express();
const port = process.env.PORT || 3001;

app.use('/api', auth, api);

app.listen(port, () => console.log(`Listening on port ${port}...`));
