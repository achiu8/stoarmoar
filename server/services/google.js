const { google } = require('googleapis');

const { authClient, isFolder } = require('../utils/google');

const listFiles = (auth, parent) =>
  google.drive({ version: 'v3', auth }).files.list({
    fields: 'nextPageToken, files(id, name, mimeType, description)',
    q: `'${parent}' in parents`
  })
    .then(({ data }) => data.files)
    .catch(err => console.log('The API returned an error:', err));

const crawlFiles = token => {
  const auth = authClient();
  auth.setCredentials(token);

  const crawl = files =>
    Promise.all(files.map(file =>
      isFolder(file)
        ? listFiles(auth, file.id)
            .then(crawl)
            .then(files => ({ ...file, files }))
        : file));

  return crawl([{ id: 'root' }]);
};

const getUser = token => {
  const auth = authClient();
  auth.setCredentials(token);

  return google.oauth2({ version: 'v1', auth }).userinfo.get()
    .then(res => res.data)
    .catch(err => console.log('The API returned an error:', err));
};

module.exports = {
  crawlFiles,
  getUser
};
