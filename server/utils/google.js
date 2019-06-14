const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));
const path = require('path');
const { google } = require('googleapis');

const SCOPES = [
  'https://www.googleapis.com/auth/drive.metadata.readonly',
  'https://www.googleapis.com/auth/userinfo.profile',
  'https://www.googleapis.com/auth/userinfo.email'
];

const TOKEN_PATH = path.resolve(__dirname, '../google_token.json');

const authClient = () =>
  new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT
  );

const authUrl = () =>
  authClient().generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES
  });

const getToken = code =>
  authClient().getToken(code)
    .then(({ tokens }) => tokens)
    .catch(err => console.log('Error fetching token:', err));

const saveToken = code =>
  authClient().getToken(code)
    .then(({ tokens }) => fs.writeFileAsync(TOKEN_PATH, JSON.stringify(tokens)))
    .catch(err => console.log('Error saving token:', err));

const loadToken = () =>
  fs.readFileAsync(TOKEN_PATH)
    .then(data => JSON.parse(data))
    .catch(err => console.log('Error loading token:', err));

const listFiles = parent => token => {
  const auth = authClient();
  auth.setCredentials(token);

  const p = parent || 'root';

  return google.drive({ version: 'v3', auth }).files.list({
    fields: 'nextPageToken, files(id, name, mimeType, description)',
    q: `'${p}' in parents`
  })
    .then(({ data }) => data.files)
    .catch(err => console.log('The API returned an error:', err));
};

const getUser = token => {
  const auth = authClient();
  auth.setCredentials(token);

  return google.oauth2({ version: 'v1', auth }).userinfo.get()
    .then(res => res.data)
    .catch(err => console.log('The API returned an error:', err));
};

module.exports = {
  authUrl,
  getToken,
  saveToken,
  listFiles,
  getUser
};
