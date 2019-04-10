/* global it describe */
const assert = require('assert');
const { compose, pipe, curry } = require('../fp');

const incrementBy = value => data => value + data;
const foldBy = value => data => value * data;
const rest = value => data => Promise.resolve(data - value);

describe('FP', function() {
  describe('#compose()', function() {
    it('should return a composed function of right to left', function() {
      let calc = compose(
        foldBy(2),
        incrementBy(1)
      );
      assert.strictEqual(calc(1), 4);
    });
    it('should return a composed function that works with promises', async function() {
      let calc = compose(
        foldBy(2),
        rest(1),
        incrementBy(2)
      );
      assert.strictEqual(await calc(1), 4);
    });
  });
  describe('#pipe()', function() {
    it('should return a composed function from left to right', function() {
      let calc = pipe(
        foldBy(2),
        incrementBy(1)
      );
      assert.strictEqual(calc(1), 3);
    });
    it('should return a composed function that works with promises', async function() {
      let calc = pipe(
        foldBy(2),
        rest(1),
        incrementBy(2)
      );
      assert.strictEqual(await calc(1), 3);
    });
  });
  describe('#curry()', function() {
    it('should return work with all parameters and with closures', function() {
      let calc = curry((a, b) => a + b);
      assert.strictEqual(calc(1, 1), calc(1)(1));
    });
    it('should return with partial application should return a function', function() {
      let calc = curry((a, b) => a + b);
      assert.strictEqual(typeof calc(1), 'function');
    });
    it('should return an error if no function passed', function() {
      assert.throws(() => {
        curry();
      }, /Error:[^[]+\[undefined\].+$/);
      assert.throws(() => {
        curry(33);
      }, /Error:[^[]+\[number\].+$/);
      assert.throws(() => {
        curry('');
      }, /Error:[^[]+\[string\].+$/);
      assert.throws(() => {
        curry(null);
      }, /Error:[^[]+\[object\].+$/);
    });
  });
});
