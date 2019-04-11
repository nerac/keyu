/* global it describe */
const assert = require('assert');
const { isNumber } = require('../types');

describe('Types', function() {
  describe('#isNumber()', function() {
    it('should return false for undefined types', function() {
      assert.strictEqual(isNumber(), false);
      assert.strictEqual(isNumber(null), false);
      assert.strictEqual(isNumber(undefined), false);
    });
    it('should return true for any kind of number', function() {
      assert.strictEqual(isNumber('1'), true);
      assert.strictEqual(isNumber(4), true);
      assert.strictEqual(isNumber('1.65'), true);
      assert.strictEqual(isNumber('0b0001'), true);
    });
    it('should return false for any kind of string', function() {
      assert.strictEqual(isNumber('1x'), false);
      assert.strictEqual(isNumber('x11'), false);
    });
  });
});
