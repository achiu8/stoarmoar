const { google } = require('googleapis');

const { authClient } = require('../utils/google');

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
  listFiles,
  getUser
};
