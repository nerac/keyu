const assert = require('assert');
const { either, not, identity } = require('../logic');

describe('Logic', function() {
  describe('#either()', function() {
    it('should return the result of function if there is no exception', function() {
      let fn = either(JSON.parse, 0);
      assert.deepEqual(fn('{"a":3}'), { a: 3 });
    });
    it('should return the default value if there is exception', function() {
      let fn = either(JSON.parse, 0);
      assert.deepEqual(fn({}), 0);
    });
    it('should return the default value from a function if there is exception', function() {
      let fn = either(JSON.parse, x => 0);
      assert.deepEqual(fn({}), 0);
    });
  });
  describe('not()', function() {
    it('should negate the value passed if identity provided', function() {
      assert.equal(not(identity)(true), false);
    });
    it('should return the opposite value given by the function', function() {
      assert.equal(not(x => x.length > 2)(''), true);
      assert.equal(not(x => x.length > 2)('xxx'), false);
    });
  });
  describe('identity()', function() {
    it('should return the exact input passed', function() {
      assert.equal(identity(3), 3);
      assert.equal(identity(''), '');
      assert.equal(identity(null), null);
      assert.equal(identity(), undefined);
    });
  });
});
