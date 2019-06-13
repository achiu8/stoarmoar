export const chunksOf = (n, xs) =>
  xs.reduce((acc, x) => {
    const i = acc.length - 1;
    const last = acc[i];

    return !last || last.length === n
      ? [...acc, [x]]
      : [...acc.slice(0, i), [...last, x]];
  }, []);

export const sample = xs =>
  xs[Math.floor(Math.random() * xs.length)];

export const filename = (name, length = 15) =>
  name.length <= length ? name : name.slice(0, length) + '...';

const accountTypes = {
  google: file => ({
    'application/vnd.google-apps.folder': 'folder',
    'application/vnd.google-apps.document': 'file-word',
    'application/vnd.google-apps.spreadsheet': 'file-excel',
    'application/vnd.google-apps.presentation': 'file-ppt',
    'application/pdf': 'file-pdf',
    'image/jpeg': 'file-jpg',
    'image/png': 'file-jpg',
    'text/csv': 'file-text',
  })[file.mimeType],

  dropbox: file => file['.tag']
};

export const filesForAccount = accountType => files =>
  files.map(file => ({
    id: file.id,
    name: file.name,
    type: accountTypes[accountType](file)
  }));
