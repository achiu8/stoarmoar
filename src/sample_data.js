import { sample } from './utils';

const fileTypes = [
  'file',
  'file-text',
  'file-pdf',
  'file-excel',
  'file-word',
  'file-ppt',
  'file-jpg',
  'folder',
];

export const files = Array.from({ length: 50 }, () => sample(fileTypes));

export const accountTypes = [
  { id: 'google', name: 'Google Drive' },
  { id: 'dropbox', name: 'Dropbox' },
  { id: 'apple', name: 'iCloud' },
  { id: 'windows', name: 'OneDrive' },
  { id: 'amazon', name: 'Amazon Drive' },
];

export const accounts = accountTypes.slice(0, 3);
