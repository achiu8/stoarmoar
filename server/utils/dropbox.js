const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));
const path = require('path');
const fetch = require('isomorphic-fetch');
const { Dropbox } = require('dropbox');

const TOKEN_PATH = path.resolve(__dirname, '../dropbox_token.json');

const dbx = new Dropbox({ clientId: process.env.DROPBOX_CLIENT_ID });

const authUrl = () =>
  dbx.getAuthenticationUrl(process.env.DROPBOX_REDIRECT);

const saveToken = token =>
  fs.writeFileAsync(TOKEN_PATH, JSON.stringify(token))
    .catch(err => console.log('Error saving token:', err));

module.exports = {
  authUrl,
  saveToken
};
