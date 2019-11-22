const KEY = 'atlasToken';

export const getToken = () =>
  localStorage.getItem(KEY);

export const saveToken = token =>
  localStorage.setItem(KEY, token);

export const clearToken = () =>
  localStorage.removeItem(KEY);
