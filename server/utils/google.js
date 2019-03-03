const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));
const path = require('path');
const readline = require('readline');
const { google } = require('googleapis');

const SCOPES = [
  'https://www.googleapis.com/auth/drive.metadata.readonly'
];

const CREDENTIALS_PATH = path.resolve(__dirname, '../credentials.json');
const TOKEN_PATH = path.resolve(__dirname, '../token.json');

const authClient = () =>
  fs.readFileAsync(CREDENTIALS_PATH)
    .then(JSON.parse)
    .then(({ clientId, clientSecret, redirect }) => new google.auth.OAuth2(clientId, clientSecret, redirect))
    .catch(err => console.log('Error loading secrets file:', err));

const authUrl = () =>
  authClient()
    .then(client => client.generateAuthUrl({
      access_type: 'offline',
      scope: SCOPES
    }));

const saveToken = code =>
  authClient()
    .then(client => client.getToken(code))
    .then(token => fs.writeFileAsync(TOKEN_PATH, JSON.stringify(token)))
    .catch(err => console.log('Error saving token:', err));

const loadToken = () =>
  fs.readFileAsync(TOKEN_PATH)
    .then(data => JSON.parse(data).tokens)
    .catch(err => console.log('Error loading token:', err));

const listFiles = () =>
  Promise.all([authClient(), loadToken()])
    .then(([auth, token]) => {
      auth.setCredentials(token);

      return google.drive({ version: 'v3', auth }).files.list({
        pageSize: 10,
        fields: 'nextPageToken, files(id, name)'
      })
    })
    .then(({ data }) => data.files)
    .catch(err => console.log('The API returned an error:', err));

module.exports = {
  authUrl,
  saveToken,
  listFiles
};
