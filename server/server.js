require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');

const auth = require('./middlewares/auth');
const api = require('./routes/index');

const app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.json());

app.use('/api', auth, api);

app.listen(port, () => console.log(`Listening on port ${port}...`));
