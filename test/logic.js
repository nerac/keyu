/* global it describe */
const assert = require('assert');
const { either, not, identity } = require('../logic');

describe('Logic', function() {
  describe('#either()', function() {
    it('should return the result of function if there is no exception', function() {
      let fn = either(JSON.parse, 0);
      assert.deepStrictEqual(fn('{"a":3}'), { a: 3 });
    });
    it('should return the default value if there is exception', function() {
      let fn = either(JSON.parse, 0);
      assert.deepStrictEqual(fn({}), 0);
    });
    it('should return the default value from a function if there is exception', function() {
      let fn = either(JSON.parse, x => 0);
      assert.deepStrictEqual(fn({}), 0);
    });
  });
  describe('not()', function() {
    it('should negate the value passed if identity provided', function() {
      assert.strictEqual(not(identity)(true), false);
    });
    it('should return the opposite value given by the function', function() {
      assert.strictEqual(not(x => x.length > 2)(''), true);
      assert.strictEqual(not(x => x.length > 2)('xxx'), false);
    });
  });
  describe('identity()', function() {
    it('should return the exact input passed', function() {
      assert.strictEqual(identity(3), 3);
      assert.strictEqual(identity(''), '');
      assert.strictEqual(identity(null), null);
      assert.strictEqual(identity(), undefined);
    });
  });
});
