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
const FILES_PATH = path.resolve(__dirname, '../google_files.json');

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

const isFolder = ({ id, mimeType }) =>
  id === 'root' || mimeType === 'application/vnd.google-apps.folder';

const saveFiles = files =>
  fs.writeFileAsync(FILES_PATH, JSON.stringify(files));

const loadFiles = () =>
  fs.readFileAsync(FILES_PATH)
    .then(data => JSON.parse(data))
    .catch(err => console.log('Error loading files:', err));;

module.exports = {
  authClient,
  authUrl,
  getToken,
  saveToken,
  isFolder,
  saveFiles,
  loadFiles
};
