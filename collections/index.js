const { curry } = require('../fp');

// eslint-disable-next-line no-extend-native
Object.prototype.reduce = function(fn, val) {
  return Object.entries(this).reduce((acc, [k, v]) => fn(acc, v, k), val) || {};
};

// eslint-disable-next-line no-extend-native
Object.prototype.map = function(fn) {
  return this.reduce((acc, v, k) => ({ ...acc, [k]: fn(v, k) }), {});
};

// eslint-disable-next-line no-extend-native
Object.prototype.filter = function(fn) {
  return this.reduce((acc, v, k) => fn(v, k) && { ...acc, [k]: v }, {});
};

const map = curry((fn, col) => col.map(fn));
const filter = curry((fn, col) => col.filter(fn));
const reduce = curry((fn, val, col) => col.reduce(fn, val));

module.exports = { map, filter, reduce };
