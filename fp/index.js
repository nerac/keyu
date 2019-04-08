const mixCompose = (chain, func) => (chain instanceof Promise || typeof chain.then === 'function' ? chain.then(func) : func(chain));

const pipe = (...fn) => input => fn.reduce(mixCompose, input);
const compose = (...fn) => input => fn.reduceRight(mixCompose, input);

const curry = f => {
  if (typeof f !== 'function') {
    throw new Error(`curry requires a function, [${typeof f}] passed`);
  }
  return function currify() {
    const args = Array.prototype.slice.call(arguments);
    return args.length >= f.length ? f.apply(null, args) : currify.bind(null, ...args);
  };
};
module.exports = { pipe, compose, curry };
