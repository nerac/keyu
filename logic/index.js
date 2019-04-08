const { curry } = require('../fp');

const either = (fn, fa) => (...arg) => {
  try {
    return fn.apply(null, arg);
  } catch (e) {
    return typeof fa === 'function' ? fa(e) : fa;
  }
};

const fnOrValue = curry((fnOrVal, data) => (typeof fnOrVal === 'function' ? fnOrVal(data) : fnOrVal));
const identity = x => x;
const not = fn => (...args) => !fn(...args);

module.exports = { either, fnOrValue, identity, not };
