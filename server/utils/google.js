const { google } = require('googleapis');

const SCOPES = [
  'https://www.googleapis.com/auth/drive.metadata.readonly',
  'https://www.googleapis.com/auth/userinfo.profile',
  'https://www.googleapis.com/auth/userinfo.email'
];

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

const isFolder = ({ id, mimeType }) =>
  id === 'root' || mimeType === 'application/vnd.google-apps.folder';

module.exports = {
  authClient,
  authUrl,
  getToken,
  isFolder
};
