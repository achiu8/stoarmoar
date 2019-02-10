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
