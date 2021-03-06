const { flatten } = require('ramda');

const traverse = (xs, f) =>
  xs.reduce((accp, x) =>
    accp.then(acc =>
      f(x).then(y =>
        [...acc, y])),
    Promise.resolve([]));

const sleep = t => x =>
  new Promise((resolve) =>
    setTimeout(() => resolve(x), t));

module.exports = {
  traverse,
  sleep
};
