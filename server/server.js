require('dotenv').config()
const express = require('express');
const google = require('./routes/google');

const app = express();
const port = process.env.PORT || 3001;

app.use('/google', google);

app.listen(port, () => console.log(`Listening on port ${port}...`));
