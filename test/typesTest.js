/* global it describe */
const assert = require('assert');
const { isNumber, isObject, isNil, getFuncName } = require('../types');

describe('Types', function() {
  describe('#isNumber()', function() {
    it('should return false for undefined types', function() {
      assert.strictEqual(isNumber(), false);
      assert.strictEqual(isNumber(null), false);
      assert.strictEqual(isNumber(undefined), false);
      assert.strictEqual(isNumber(NaN), false);
    });
    it('should return true for any kind of number', function() {
      assert.strictEqual(isNumber('1'), true);
      assert.strictEqual(isNumber(4), true);
      assert.strictEqual(isNumber('1.65'), true);
      assert.strictEqual(isNumber('0b0001'), true);
    });
    it('should return false for any kind of string', function() {
      assert.strictEqual(isNumber('1x'), true);
      assert.strictEqual(isNumber('x11'), false);
    });
    it('should return false for non strict integers when flag is true', function() {
      assert.strictEqual(isNumber(true), false);
      assert.strictEqual(isNumber(null, true), false);
      assert.strictEqual(isNumber('33', true), false);
      assert.strictEqual(isNumber('aaa', true), false);
      assert.strictEqual(isNumber('[]', true), false);
      assert.strictEqual(isNumber('', true), false);
    });
    it('should return true for strict integers when flag is true', function() {
      assert.strictEqual(isNumber(33, true), true);
    });
  });
  describe('#isObject()', function() {
    it('should return false for undefined types', function() {
      assert.strictEqual(isObject(), false);
      assert.strictEqual(isObject(null), false);
      assert.strictEqual(isObject(undefined), false);
    });
    it('should return true for objects', function() {
      assert.strictEqual(isObject({}), true);
      assert.strictEqual(isObject({ a: 1 }), true);
    });
    it('should return true for instances', function() {
      assert.strictEqual(isObject(new Error('hello')), true);
    });
  });
  describe('#isNil()', function() {
    it('should true for undefined', function() {
      assert.strictEqual(isNil(), true);
    });
    it('should true for null', function() {
      assert.strictEqual(isNil(null), true);
    });
    it('should false for any existent type', function() {
      assert.strictEqual(isNil(0), false);
      assert.strictEqual(isNil(''), false);
      assert.strictEqual(isNil(1.234), false);
      assert.strictEqual(isNil({}), false);
      assert.strictEqual(isNil([]), false);
    });
  });
  describe('#getFuncName()', function() {
    it('should return Unknown if called outside a function', function() {
      assert.strictEqual(getFuncName(), 'Unknown');
    });
    it('should return the passed value if called outside a function', function() {
      assert.strictEqual(getFuncName('ups'), 'ups');
    });
    it('should return the name of the arrow function that called ', function() {
      const hellow = () => getFuncName();
      assert.strictEqual(hellow(), 'hellow');
    });
    it('should return the name of the regular function that called ', function() {
      function hellow() {
        return getFuncName();
      }
      assert.strictEqual(hellow(), 'hellow');
    });
  });
});
