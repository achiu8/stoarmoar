const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));
const path = require('path');
const readline = require('readline');
const { google } = require('googleapis');

const SCOPES = [
  'https://www.googleapis.com/auth/drive.metadata.readonly'
];

const TOKEN_PATH = path.resolve(__dirname, '../token.json');

const authClient = () =>
  new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT
  );

const authUrl = () =>
  authClient().generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES
  });

const saveToken = code =>
  authClient().getToken(code)
    .then(token => fs.writeFileAsync(TOKEN_PATH, JSON.stringify(token)))
    .catch(err => console.log('Error saving token:', err));

const loadToken = () =>
  fs.readFileAsync(TOKEN_PATH)
    .then(data => JSON.parse(data).tokens)
    .catch(err => console.log('Error loading token:', err));

const listFiles = () =>
  loadToken()
    .then(token => {
      const auth = authClient();
      auth.setCredentials(token);

      return google.drive({ version: 'v3', auth }).files.list({
        fields: 'nextPageToken, files(id, name, mimeType, description)'
      })
    })
    .then(({ data }) => data.files)
    .catch(err => console.log('The API returned an error:', err));

module.exports = {
  authUrl,
  saveToken,
  listFiles
};
