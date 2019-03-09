const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));
const path = require('path');
const fetch = require('isomorphic-fetch');
const { Dropbox } = require('dropbox');

const TOKEN_PATH = path.resolve(__dirname, '../dropbox_token.json');

const dbx = accessToken =>
  new Dropbox({
    fetch,
    clientId: process.env.DROPBOX_CLIENT_ID,
    accessToken
  });

const authUrl = () =>
  dbx().getAuthenticationUrl(process.env.DROPBOX_REDIRECT);

const saveToken = token =>
  fs.writeFileAsync(TOKEN_PATH, JSON.stringify(token))
    .catch(err => console.log('Error saving token:', err));

const loadToken = () =>
  fs.readFileAsync(TOKEN_PATH)
    .then(data => JSON.parse(data))
    .catch(err => console.log('Error loading token:', err));

const listFiles = () =>
  loadToken()
    .then(token => dbx(token).filesListFolder({ path: '' }))
    .then(({ entries }) => entries)
    .catch(err => console.log('The API returned an error:', err));

module.exports = {
  authUrl,
  saveToken,
  listFiles
};
