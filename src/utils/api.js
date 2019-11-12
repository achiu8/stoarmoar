import { mergeDeepRight } from 'ramda';

import { getToken } from './auth';

const http = method => (url, options = {}) =>
  fetch(url, mergeDeepRight({
    method,
    headers: {
      'Authorization': `Bearer ${getToken()}`,
      'Content-Type': 'application/json'
    }
  }, options)).then(res => res.json());

export default {
  get: http('GET'),
  post: http('POST')
};
